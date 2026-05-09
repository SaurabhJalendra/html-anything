/**
 * WhatsApp `_chat.txt` export → scrollable bubble timeline.
 *
 * v0 status: parser stub. Detects WhatsApp exports by their characteristic
 * `[YYYY-MM-DD, HH:MM:SS] <Sender>: <message>` line prefix, but the
 * full timeline UI (bubble layout, sender colors, media inline, search,
 * filters) ships in the next iteration.
 *
 * Until then, returns a friendly "coming soon" page with a count of
 * messages parsed, so users can confirm the file was recognized.
 */
import * as fs from "node:fs/promises"
import * as path from "node:path"
import type { Converter, ConverterInput } from "../types.js"
import { htmlShell, escapeHtml } from "../shared/shell.js"

// Matches: [2024-01-01, 12:34:56] Sender Name: message
// or:      [1/1/24, 12:34:56 PM] Sender Name: message
// (WhatsApp varies locale-by-locale; pattern is intentionally loose.)
const MSG_RE = /^\[(\d{1,4}[/.-]\d{1,2}[/.-]\d{1,4}),?\s+(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[AP]M)?)\]\s+([^:]+):\s*(.*)$/

interface Msg {
  ts: string
  date: string
  time: string
  sender: string
  text: string
}

export const converter: Converter = {
  name: "whatsapp",
  matches: [".txt"],
  async detect(filepath: string): Promise<boolean> {
    // Quick peek: read first ~2KB and look for the timestamp prefix.
    try {
      const fd = await fs.open(filepath, "r")
      const buf = Buffer.alloc(2048)
      const { bytesRead } = await fd.read(buf, 0, buf.length, 0)
      await fd.close()
      const sample = buf.subarray(0, bytesRead).toString("utf8")
      // Need at least 2 matches to claim — guards against random `[date]` text.
      let hits = 0
      for (const line of sample.split("\n")) {
        if (MSG_RE.test(line)) hits++
        if (hits >= 2) return true
      }
      return false
    } catch {
      return false
    }
  },
  async render(input: ConverterInput): Promise<string> {
    const raw = await fs.readFile(input.filepath, "utf8")
    const msgs = parseChat(raw)
    const senders = new Set(msgs.map(m => m.sender))
    const title = input.options.title || `${path.basename(input.filepath, path.extname(input.filepath))}`
    const eyebrow = `WhatsApp · ${msgs.length.toLocaleString()} messages · ${senders.size} senders`

    // v0 placeholder body — counts + a "rendering coming soon" panel.
    // The next iteration replaces this with bubble timeline + filters.
    const body = `
<div class="wa-stub">
  <h2>Parsed.</h2>
  <p>Found <strong>${msgs.length.toLocaleString()}</strong> messages from <strong>${senders.size}</strong> senders, between <strong>${msgs[0]?.date || "?"}</strong> and <strong>${msgs[msgs.length - 1]?.date || "?"}</strong>.</p>
  <p class="wa-stub__note">The full bubble-timeline UI is being built. For now this page confirms the export was recognized. Track progress at <a href="https://github.com/clockless-org/html-anything/issues">github.com/clockless-org/html-anything</a>.</p>
  <details class="wa-stub__sample">
    <summary>Show first 20 messages (raw parse)</summary>
    <ul>
      ${msgs.slice(0, 20).map(m => `<li><span class="wa-stub__ts">${escapeHtml(`${m.date} ${m.time}`)}</span> <strong>${escapeHtml(m.sender)}</strong>: ${escapeHtml(m.text)}</li>`).join("\n      ")}
    </ul>
  </details>
</div>`

    return htmlShell({
      title,
      eyebrow,
      body,
      search: false, // disabled until the real timeline ships
      extraCss: STUB_CSS,
    })
  },
}

function parseChat(raw: string): Msg[] {
  const out: Msg[] = []
  let curr: Msg | null = null
  for (const line of raw.replace(/\r\n/g, "\n").split("\n")) {
    const m = MSG_RE.exec(line)
    if (m) {
      if (curr) out.push(curr)
      curr = { ts: `${m[1]} ${m[2]}`, date: m[1], time: m[2], sender: m[3].trim(), text: m[4] || "" }
    } else if (curr) {
      // Continuation of previous message (multi-line text)
      curr.text += "\n" + line
    }
  }
  if (curr) out.push(curr)
  return out
}

const STUB_CSS = `
.wa-stub h2 { margin-top: 0; }
.wa-stub__note { color: var(--ha-fg-muted); font-size: 14px; }
.wa-stub__sample { margin-top: 24px; }
.wa-stub__sample summary { cursor: pointer; color: var(--ha-accent); font-weight: 600; }
.wa-stub__sample ul { padding-left: 0; list-style: none; margin-top: 12px; }
.wa-stub__sample li { padding: 6px 0; border-bottom: 1px solid var(--ha-border); font-size: 14px; }
.wa-stub__ts { font-family: var(--ha-mono); color: var(--ha-fg-muted); font-size: 12px; margin-right: 8px; }
`
