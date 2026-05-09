# Writing a Converter

A converter takes one input file (or directory) and returns a single
self-contained HTML string. The shape is:

```ts
import type { Converter } from "../types.js"
import { htmlShell } from "../shared/shell.js"

export const converter: Converter = {
  name: "your-format",
  matches: [".ext"],          // file extensions (with leading dot)
  detect: async (path) => {   // optional: confirm by content
    // peek at the first few KB and return true if you claim it
  },
  render: async (input) => {
    const body = "<p>your HTML body</p>"
    return htmlShell({
      title: "...",
      eyebrow: "Format · count",
      body,
    })
  },
}
```

Then add the import to `src/converters/index.ts`. That's it.

## The `htmlShell` skeleton

Every converter wraps its content in `htmlShell({ title, eyebrow, body, … })`.
The shell provides the sticky header, search box, scroll-to-top button,
dark-mode CSS, and mobile responsiveness. **Do not** ship your own
`<html>` skeleton — the consistent design is the product.

If your converter needs format-specific styles, pass them in via
`extraCss`. For interactivity, `extraJs`. Use these sparingly.

## Search

Wrap searchable content with `data-searchable`. The shell's search box
auto-shows/hides those elements as the user types. For example:

```html
<article class="msg" data-searchable>
  ${escapeHtml(message.text)}
</article>
```

For more granular search (different `searchable` keys per element), set
`data-searchable-text` to the string the search should match against.

## LLM access

Converters get an optional `llm` helper:

```ts
async render({ filepath, options, llm }) {
  if (llm) {
    const summary = await llm.ask("Summarize this in 2 sentences: ...")
  }
  // …
}
```

When `--no-ai` is passed (or no provider env var is set), `llm` is `null`.
**A converter must produce reasonable output without `llm`.** The LLM
fills in things the source file doesn't have (chapter titles, summaries,
classifications) — but the layout itself must be deterministic.

## Single-file output

The output HTML is a **single file**. Inline all CSS into `<style>`,
all JS into `<script>`, and any required fonts as system-font fallbacks
or web-font CDN links. For binary attachments (photos, voice notes),
honor `options.inlineMedia`: when true, base64-encode them; when false,
reference them by relative path (the user is responsible for shipping
the assets alongside the HTML).

## Self-contained means self-contained

Anyone double-clicking the output should see something that works,
offline, without a server. No `file://` resource fetches, no missing
fonts, no broken icons. If you need an icon, prefer Unicode + emoji
or inline SVG; don't pull from a CDN that might be blocked.

## Examples

- [`markdown.ts`](../src/converters/markdown.ts) — the simplest converter,
  end-to-end. ~150 lines including a tiny markdown parser.
- [`whatsapp.ts`](../src/converters/whatsapp.ts) — uses `detect` to confirm
  by content (timestamp prefix), parses to a structured array, renders.
