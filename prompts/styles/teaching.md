# Teaching Style

Use this style when the user asks for a teaching site, tutorial, lesson,
interactive explainer, course page, "teach me", or educational page from a
brief/source.

The page should feel like a guided learning artifact, not a paper, blog post,
or dashboard. The user should be able to learn by looking, changing something,
checking themselves, and moving to the next idea.

## Page Shape

- Open with the actual lesson surface: a visual stage, simulator, annotated
  diagram, timeline, map, model, or worked example. Do not start with a
  marketing hero.
- Add a compact lesson rail or stepper with 4-7 named steps. Each step changes
  the main visual, explanation, or highlighted evidence.
- Pair every important concept with a visible example, contrast, or
  mini-interaction.
- Include at least one "try it" control where the learner can change a value,
  select an object, scrub time, reveal layers, compare states, or answer a
  small check.
- End with a short recap panel: 3 takeaways, 1 common misconception, and 1 next
  thing to explore.

## Visual Language

- Use the Clockless tokens from `prompts/_design.md`.
- Prefer a clean classroom-lab surface: warm background, high-contrast labels,
  clear annotations, and restrained accent color.
- Make diagrams concrete. Use generated bitmap assets for rich subjects when
  useful, and SVG/CSS/canvas for labels, arrows, paths, charts, and deterministic
  models.
- Keep controls close to the thing they affect. Avoid remote settings panels
  unless the lesson needs a dense simulator.
- Use motion only to teach: orbit, flow, reveal, growth, before/after, or
  cause/effect. Provide a pause/reduce-motion path for looping animation.

## Teaching Voice

- Explain in short, direct blocks. Prefer "Notice...", "Try...", "Compare...",
  and "This matters because..." over academic section prose.
- Use everyday analogies only when they clarify the model.
- Label uncertainty and simplifications. If a model is simplified for learning,
  say so in the UI.
- Do not over-claim. For current science, health, legal, finance, or other
  high-stakes topics, verify facts and keep caveats visible.

## Required Modules

- **Objective**: one sentence stating what the learner will understand or do.
- **Lesson stage**: the main interactive visual or worked example.
- **Step rail**: ordered lesson states with active progress.
- **Concept cards**: 3-6 compact ideas with examples.
- **Try it**: learner-controlled input or toggle.
- **Check yourself**: one lightweight quiz, prediction, or reflection prompt
  with immediate feedback.
- **Recap**: takeaways, misconception, and next exploration.

## Avoid

- A long article layout with charts dropped between paragraphs.
- Generic "overview / features / benefits" landing pages.
- Dozens of disconnected facts with no learning sequence.
- Dense academic copy, abstract methodology sections, or citation-like clutter
  unless the user explicitly asks for a research-style lesson.
- Decorative visuals that do not help the learner reason about the topic.

## Implementation Notes

- Keep the page static and local-first: inline CSS and JS, no external JS/CDN.
- Make keyboard and touch interaction usable. Buttons must have clear labels or
  accessible titles.
- On mobile, the lesson stage stays first, then the step rail, then details.
- Verify the main stage is nonblank and the primary interaction changes visible
  state before handoff.
