# Comic Book Style

Use this style when the user asks for a comic book, manga, cartoon lesson,
story explainer, "explain this simply", or wants a concept, PDF, article, or
document made easy to understand through a character-led sequence.

Prefer `teaching` when the user wants a lab-like lesson with controls and
quizzes. Prefer `interactive-learning` when the object/model itself should be
the app. Use `comic-book` when the lesson should feel like a short illustrated
book the reader can page through.

## Underlying System: Doraemon-Style Comic Explainer

This is a **six-to-seven-page Doraemon-style knowledge comic**. The output is
not a teaching dashboard with comic decoration; it should feel like a generated
vertical manga page reader. The first viewport is a complete comic page or the
top of a real comic page, with page navigation secondary.

This style is inspired by the local `dora-website` generation pipeline:

1. **Storyboard first** — silently plan a JSON-like storyboard before writing
   HTML: title, 6-7 pages, 3-5 dynamic panels per page, panel descriptions, and
   dialogue with no character-name prefixes inside speech bubbles.
2. **Page-image mindset** — render each page as one unified illustrated comic
   page. Avoid sidebars, glossary dashboards, KPI cards, or app panels in the
   first viewport.
3. **Doraemon art constraint** — use 哆啦A梦风格: cute rounded Fujiko F. Fujio
   manga language, clean black linework, bright colors, warm everyday scenes,
   dynamic panels, occasional frame breaks, clear Chinese speech bubbles.
4. **Doraemon as teacher** — when the user asks for Doraemon, the recurring
   teacher is 哆啦A梦: round blue robot cat, no ears, white face and belly, red
   nose and collar, yellow bell, four-dimensional pocket, cheerful helper
   energy.
5. **Pocket gadget pedagogy** — every difficult abstraction becomes a visible
   prop pulled from the pocket: a mini-machine, labeled object, comparison
   diagram, meter, map, or tiny experiment.
6. **Recap page** — the final page gives 3 takeaways, 1 misconception, and 1
   next question.

Component vocabulary:

- `.comic-book-shell`, `.comic-toolbar`, `.page-strip`, `.page-dot`
- `.comic-stage`, `.comic-page`, `.page-meta`, `.panel-grid`
- `.comic-panel`, `.caption-box`, `.speech-bubble`, `.thought-bubble`
- `.teacher-character`, `.learner-character`, `.pocket-gadget`, `.sound-fx`
- `.recap-page`, `.comic-glossary`, `.source-notes`

## Narrative Contract

- Start with the learner's confusion in page 1.
- Put only one major idea on each page.
- Make Doraemon act, not lecture: open the four-dimensional pocket, transform a
  document into props, compare two examples, reveal an inside view, or run a
  tiny experiment.
- Convert source paragraphs into dialogue, captions, labeled props, and
  visible cause/effect.
- Keep the reading level plain. Define terms the first time they appear.
- If summarizing PDFs, DOCX, articles, or high-stakes material, label
  simplifications and preserve source-grounded caveats.

Recommended seven-page arc:

1. Hook: what feels confusing?
2. Split: break the concept/document into simple pieces.
3. Name: introduce the key vocabulary.
4. Mechanism: show what changes what.
5. Tradeoff: show why the idea matters in real use.
6. Pitfall: correct the most common misunderstanding.
7. Recap: 3 takeaways, 1 misconception, 1 next question.

## Visual Language

- Use a vertical 2:3 comic page surface: cream paper, thick black ink borders,
  panel gutters, caption boxes, page numbers, halftone texture, and a small
  publisher-style footer.
- Use the Doraemon palette: signature blue, white face/belly, red nose/collar,
  yellow bell and captions, warm sky/cream classroom backgrounds, and green for
  "now it clicks" moments. Avoid one-note purple/blue gradients.
- Panels should use square or lightly rounded corners, 8px radius maximum.
- Speech bubbles should be readable, never tiny. Use tails, outlines, and
  high-contrast text.
- Use inline SVG/CSS illustrations for Doraemon, the learner, props, arrows,
  labels, and diagrams. Generated bitmap panels are allowed when the subject
  benefits from richer illustration, but the final page must still work offline.
- Keep manga/comic energy in the page shape, not in clutter. A reader should
  understand the page order at a glance.

## Interaction Model

The page should still be usable as a static comic if JavaScript is unavailable,
but interactions should make paging and comprehension easier:

- Page dots/thumbnails switch the visible page.
- Previous/next buttons page through the story.
- A small pocket drawer can reveal definitions and source notes, but it must sit
  below or after the comic page, not as a dominant first-viewport sidebar.
- Optional "simplify / source mode" toggle swaps between kid-simple dialogue
  and source-grounded wording.
- Optional panel click highlights key objects or reveals labels.

All controls must be keyboard accessible with visible focus states.

## Required Modules

- Comic toolbar with title, source/concept label, and page count.
- Six or seven `.comic-page` sections.
- At least one recurring `.teacher-character` that visibly reads as Doraemon
  when the prompt asks for Doraemon.
- At least four `.speech-bubble` elements and four `.caption-box` elements.
- At least three `.pocket-gadget` visual metaphors tied to the source.
- `.page-strip` navigation.
- Final `.recap-page` with 3 takeaways, 1 misconception, and 1 next question.
- Small `.source-notes` area when the input is a document, PDF, article, or any
  factual domain where simplification could lose nuance.

## Avoid

- A single long scrolling explainer with decorative comic fonts.
- A generic slide deck with one panel per slide.
- Dashboards, KPI cards, data tables, or source dumps in the first viewport.
- Generic substitute mascots when the user explicitly asks for Doraemon.
- Using the name Doraemon while drawing a random cat with ears; Doraemon has no
  ears and must keep the round robot-cat silhouette.
- Overly cute copy that hides uncertainty, caveats, or source limits.

## Quality Checklist

Before returning the HTML, verify:

- The root tag is `<html ... data-ha-style="comic-book">`.
- The first viewport visibly reads as a comic book page/spread.
- There are exactly six or seven primary pages unless the user requested a
  different count.
- Each page has one learning purpose and at least two panels or one deliberate
  full-page splash.
- Page navigation changes the visible page and has a keyboard path.
- The final recap can be understood without reading the source document.
