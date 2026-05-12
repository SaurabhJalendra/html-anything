# Comic Book Style

Use this style when the user asks for a comic book, manga, cartoon lesson,
story explainer, "explain this simply", or wants a concept, PDF, article, or
document made easy to understand through a character-led sequence.

Prefer `teaching` when the user wants a lab-like lesson with controls and
quizzes. Prefer `interactive-learning` when the object/model itself should be
the app. Use `comic-book` when the lesson should feel like a short illustrated
book the reader can page through.

If the user names a protected character or franchise, keep the requested role
and emotional function but create an original, legally distinct teacher
character. For example, use a friendly blue robot-cat tutor with a magic pocket
and original name, not a replica, logo, or exact character design.

## Underlying System: Comic Book Explainer

This is a **six-to-seven-page comic explainer**. The first viewport is a
readable comic spread with page navigation, not a hero page, article, or
dashboard.

Base scaffold:

1. **Comic book shell** — a tactile book/workbench surface with title, page
   count, and page controls.
2. **Six or seven pages** — each page has a clear teaching job and advances the
   story.
3. **Panel grid** — 2-4 panels per page, with captions, speech bubbles, labels,
   arrows, and simple visual metaphors.
4. **Teacher character** — a recurring original mascot/mentor who explains,
   reacts, asks questions, and pulls visual props from a pocket/toolkit.
5. **Pocket gadget** — each difficult abstraction becomes a concrete prop,
   diagram, or mini-machine inside the panels.
6. **Recap page** — the final page gives 3 takeaways, 1 misconception, and a
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
- Make the teacher character act, not lecture: open a pocket, transform a
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

- Use a tactile printed-comic surface: cream paper, black ink borders, halftone
  dots, panel gutters, caption boxes, page numbers, and page tabs.
- Use a lively but balanced palette: blue for the teacher, yellow for captions,
  red/orange for action, green for "now it clicks" moments. Avoid one-note
  purple/blue gradients.
- Panels should use square or lightly rounded corners, 8px radius maximum.
- Speech bubbles should be readable, never tiny. Use tails, outlines, and
  high-contrast text.
- Use inline SVG/CSS illustrations for characters, props, arrows, labels, and
  diagrams. Generated bitmap panels are allowed when the subject benefits from
  richer illustration, but the final page must still work offline.
- Keep manga/comic energy in the page shape, not in clutter. A reader should
  understand the page order at a glance.

## Interaction Model

The page should still be usable as a static comic if JavaScript is unavailable,
but interactions should make paging and comprehension easier:

- Page dots/thumbnails switch the visible page.
- Previous/next buttons page through the story.
- A glossary or pocket drawer reveals definitions and source notes.
- Optional "simplify / source mode" toggle swaps between kid-simple dialogue
  and source-grounded wording.
- Optional panel click highlights key objects or reveals labels.

All controls must be keyboard accessible with visible focus states.

## Required Modules

- Comic toolbar with title, source/concept label, and page count.
- Six or seven `.comic-page` sections.
- At least one recurring `.teacher-character`.
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
- Exact replicas of copyrighted characters, logos, catchphrases, costumes, or
  franchise-specific designs unless supplied by the user as licensed assets.
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
