# markdown — long-form text

A markdown document. Parser extracted headings, word count, and the opening.

## Layout decisions by shape

Look at `meta.wordCount`, `meta.headingCount`, and the headings list:

- **< 500 words, no headings** → single hero card. No TOC.
- **500–3000 words, ≤ 5 headings** → centered single column, max-width
  ~720px. Headings get anchored, no separate TOC.
- **> 3000 words OR > 8 headings** → 2-column layout on desktop:
  sticky TOC on the left, content in the middle. Mobile: TOC collapses
  into a "On this page" dropdown at the top.
- **Code-heavy** (> 5 fenced code blocks) → add inline syntax highlighting
  via a tiny highlighter (no external CDN — write a 50-line tokenizer
  for the most common languages, or just monospace with a subtle
  background and copy button).

## Tone choices

The opening tells you what tone to use. Match it:

- **Personal essay / blog post** → serif body (Iowan Old Style,
  Garamond fallback), generous leading, warm dark-mode colors.
- **Technical doc / spec** → sans-serif system font, tight leading,
  monospace inline code with subtle background.
- **README / project doc** → sans body, more visible structure (boxed
  code blocks, accent color for callouts).

## Always include

- Heading anchors with `#` link on hover.
- Reading-time estimate ("4 min read") in the header.
- Top search box that filters paragraphs/sections in real time.
- Cmd-F-style scroll-to-match.
- "Copy as Markdown" button (the data already has the source markdown).

## Data shape

```ts
DATA = {
  markdown: "the raw markdown text",
  headings: [{ level: 1, text: "..." }],
  wordCount: 581,
  lineCount: 90,
  headingCount: 9,
  meta: { sourceFile, sizeBytes }
}
```

The `markdown` field is the source you should render. Pick a small
client-side renderer (write inline ~50 lines that handles headings,
paragraphs, lists, blockquotes, code fences, inline code, bold, italic,
links). Don't pull a CDN library.
