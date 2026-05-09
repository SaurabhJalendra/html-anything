---
name: html-anything
description: Turn any file or URL into a single self-contained interactive HTML page designed for THIS specific content (not a generic format conversion).
when_to_use: User says "convert to HTML", "render as HTML", "make a webpage from", asks for an "interactive" or "browsable" version of a file, or pastes a file path / URL with a request to view, share, or read it nicely.
---

# html-anything

You are turning a file or URL into a single self-contained HTML page —
**designed specifically for the content in front of you**, not for the
content's *format*.

The same content type deserves different presentations depending on shape:

- 2-person friend chat → bubble timeline grouped by day
- 200-person Slack channel → folded by sender + top-contributors view
- 50-row sales CSV → sortable table
- 50,000-row CSV → summary charts + virtualized rows
- 5-page recipe PDF → recipe card UI
- 500-page report → TOC + chaptered reading view
- A GitHub repo → annotated explainer with file tree + key flows
- A long blog post → stripped reading view + reading time + key quote callouts

Your job is to **look at a sample of the input**, decide what UI helps a
human read *this thing*, and produce the HTML+CSS+JS that renders it.
Then **inline the full data into the HTML**.

## Behavior

1. **Identify the source.**
   - File: use extension + content sniff (`Read` the file).
   - URL: match against patterns (github.com/owner/repo, medium.com/*,
     substack.com/*, etc.) (`WebFetch` the URL).

2. **Look up the matching prompt** in `prompts/<source-type>.md`. The
   prompt contains source-specific guidance for design decisions and the
   data shape you'll work with. If no specific prompt fits, use
   `prompts/default.md`.

3. **Read a sample, not the whole thing.** ~5–15 KB is plenty.
   - Tabular data: header + first 5 rows + last 2 rows + column stats.
   - Chat: first 8 + last 4 messages + sender list.
   - Long text: first 1500 chars + headings + word count.
   - URL article: first 2-3K chars of the rendered text + meta.
   - Repo: README + tree + 3 key files.

4. **Design the page**, following the source-specific prompt's guidance.
   Include:
   - Light + dark mode (via `prefers-color-scheme`).
   - Mobile-first responsive layout.
   - Search box that filters or highlights matching content.
   - "Copy as Markdown" button where it makes sense.
   - Single self-contained HTML — inline CSS, inline JS, no external
     dependencies except a Google Font import if useful.

5. **Inline the full data.** Embed it as a JSON literal:
   ```html
   <script>const DATA = /* the full data here */;</script>
   ```
   Escape `</script>` to `<\/script>` inside the JSON string to keep the
   browser parser happy. The JS you wrote uses `DATA` to render rows /
   messages / sections — the LLM (you) only ever saw the sample, but the
   page renders the full thing client-side.

6. **Write the file** to `<input-stem>.html` next to the input (or
   wherever the user asked).

## Sources supported

| Prompt file | When |
|---|---|
| [`prompts/whatsapp.md`](./prompts/whatsapp.md) | WhatsApp `_chat.txt` export |
| [`prompts/csv.md`](./prompts/csv.md) | CSV / TSV tabular data |
| [`prompts/markdown.md`](./prompts/markdown.md) | Markdown documents |
| [`prompts/json.md`](./prompts/json.md) | JSON data files |
| [`prompts/github-repo.md`](./prompts/github-repo.md) | github.com/owner/repo URLs |
| [`prompts/url-article.md`](./prompts/url-article.md) | Blog posts, news articles, long-form web pages |
| [`prompts/default.md`](./prompts/default.md) | Anything else |

**Adding a new source** = drop a new `<source>.md` in `prompts/`,
following the same shape as existing ones. No code changes, no
registration step. The skill auto-finds it.

## Hard rules

- **Single file out.** No multi-file SPAs. Email-attachable.
- **Self-contained.** Must work offline by double-clicking.
- **Don't render data through the LLM.** You see the sample only. The
  full data is inlined into the HTML and rendered client-side by JS you
  write. This way the same skill handles a 50-row CSV and a 500K-row
  CSV the same way.
- **Don't write a generic template.** Read the sample. Look at the
  shape. Pick the layout that fits *this* content. A different sample of
  the same source should produce a different design.
