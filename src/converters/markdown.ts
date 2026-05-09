/**
 * Markdown → HTML.
 *
 * The simplest converter — proves the framework end-to-end. Produces a
 * cleanly-typeset reading view of any markdown file with sticky search
 * and (optionally) an LLM-generated TL;DR at the top.
 *
 * The markdown parser is intentionally small (~150 lines, no deps).
 * Spec-compliance is not the goal — readability is. If a doc needs
 * full CommonMark / GFM support, add `marked` later.
 */
import * as fs from "node:fs/promises"
import * as path from "node:path"
import type { Converter, ConverterInput } from "../types.js"
import { htmlShell, escapeHtml } from "../shared/shell.js"

export const converter: Converter = {
  name: "markdown",
  matches: [".md", ".markdown", ".mdown", ".mkd"],
  async render(input: ConverterInput): Promise<string> {
    const raw = await fs.readFile(input.filepath, "utf8")
    const title = input.options.title || extractTitle(raw) || path.basename(input.filepath, path.extname(input.filepath))

    // Optional: short TL;DR at the top, only when --ai is on AND the doc
    // is long enough to benefit (sub-300-line docs read fast already).
    let tldr = ""
    if (input.llm && raw.split("\n").length > 50) {
      try {
        const summary = await input.llm.ask(
          `Summarize this document in 2-3 sentences. Be concrete and direct, no preamble. Document:\n\n${raw.slice(0, 8000)}`,
          { maxTokens: 200 },
        )
        if (summary) tldr = `<aside class="md-tldr"><strong>TL;DR</strong><p>${escapeHtml(summary)}</p></aside>`
      } catch {
        // LLM failure shouldn't block conversion
      }
    }

    const body = mdToHtml(raw)
    const wordCount = raw.split(/\s+/).filter(Boolean).length

    return htmlShell({
      title,
      eyebrow: `Markdown · ${wordCount.toLocaleString()} words`,
      body: `${tldr}<article class="md-body" data-searchable>${body}</article>`,
      extraCss: TLDR_CSS,
    })
  },
}

const TLDR_CSS = `
.md-tldr {
  background: var(--ha-accent-soft);
  border-left: 3px solid var(--ha-accent);
  border-radius: 4px;
  padding: 12px 18px;
  margin-bottom: 28px;
  font-size: 14.5px;
}
.md-tldr strong {
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ha-accent);
  display: block;
  margin-bottom: 6px;
}
.md-tldr p { margin: 0; }
`

function extractTitle(md: string): string | null {
  const lines = md.split("\n")
  for (const line of lines.slice(0, 10)) {
    const m = /^#\s+(.+?)\s*$/.exec(line)
    if (m) return m[1]
  }
  return null
}

/**
 * Tiny markdown → HTML. Handles the common shapes (headings, paragraphs,
 * lists, blockquotes, code blocks, inline code, bold, italic, links).
 * Escapes HTML in input. ~150 lines, no deps.
 */
function mdToHtml(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n")
  const out: string[] = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]

    // Code fence
    const fence = /^```(\w*)\s*$/.exec(line)
    if (fence) {
      const lang = fence[1]
      const buf: string[] = []
      i++
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        buf.push(lines[i])
        i++
      }
      i++ // skip closing fence
      const langAttr = lang ? ` class="lang-${escapeHtml(lang)}"` : ""
      out.push(`<pre><code${langAttr}>${escapeHtml(buf.join("\n"))}</code></pre>`)
      continue
    }

    // Heading
    const h = /^(#{1,6})\s+(.+?)\s*$/.exec(line)
    if (h) {
      const lvl = h[1].length
      out.push(`<h${lvl}>${inlineMd(h[2])}</h${lvl}>`)
      i++
      continue
    }

    // Horizontal rule
    if (/^([-*_])(\s*\1){2,}\s*$/.test(line)) {
      out.push(`<hr>`)
      i++
      continue
    }

    // Blockquote
    if (/^>\s?/.test(line)) {
      const buf: string[] = []
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ""))
        i++
      }
      out.push(`<blockquote>${inlineMd(buf.join(" "))}</blockquote>`)
      continue
    }

    // Unordered list
    if (/^\s*[-*+]\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
        items.push(`<li>${inlineMd(lines[i].replace(/^\s*[-*+]\s+/, ""))}</li>`)
        i++
      }
      out.push(`<ul>${items.join("")}</ul>`)
      continue
    }

    // Ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(`<li>${inlineMd(lines[i].replace(/^\s*\d+\.\s+/, ""))}</li>`)
        i++
      }
      out.push(`<ol>${items.join("")}</ol>`)
      continue
    }

    // Blank line — paragraph break
    if (/^\s*$/.test(line)) {
      i++
      continue
    }

    // Paragraph: collect until blank line / block-starter
    const buf: string[] = [line]
    i++
    while (i < lines.length && !/^\s*$/.test(lines[i]) && !isBlockStart(lines[i])) {
      buf.push(lines[i])
      i++
    }
    out.push(`<p>${inlineMd(buf.join(" "))}</p>`)
  }
  return out.join("\n")
}

function isBlockStart(line: string): boolean {
  return /^(#{1,6}\s|>\s|\s*[-*+]\s|\s*\d+\.\s|```|---|___|\*\*\*)/.test(line)
}

function inlineMd(text: string): string {
  // Order matters: escape HTML first, then re-introduce span markup.
  let s = escapeHtml(text)
  // Inline code first so inner content isn't double-processed.
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>")
  // Links: [text](url)
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, txt, url) => `<a href="${escapeAttr(url)}" target="_blank" rel="noreferrer">${txt}</a>`)
  // Bold: **text**
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
  // Italic: *text* or _text_ (avoid eating ** by requiring single asterisk boundaries)
  s = s.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, "$1<em>$2</em>")
  s = s.replace(/(^|[^_])_([^_]+)_(?!_)/g, "$1<em>$2</em>")
  return s
}

function escapeAttr(s: string): string {
  return s.replace(/"/g, "&quot;")
}
