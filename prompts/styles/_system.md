# Structural Style System Contract

Styles in html-anything are **underlying page systems**, not CSS themes.

The selected style must decide the generated page's:

- information architecture,
- first viewport composition,
- layout scaffold,
- component vocabulary,
- density and reading rhythm,
- chart grammar,
- interaction model,
- visual tone,
- copy voice.

Do not create one generic report and then recolor it. Build from the
selected system's skeleton first, then fill it with source-specific analysis.

## Required Generation Order

1. Choose the page system from the selected style.
2. Sketch the first viewport around that system.
3. Choose modules from the source prompt.
4. Translate those modules into the style's component vocabulary.
5. Write HTML/CSS/JS with style-specific class names and layout primitives.

## What Counts As A Real Style

A real style changes at least five of these:

- page shell,
- navigation / control placement,
- primary visual surface,
- section rhythm,
- chart geometry,
- card density,
- typography role,
- interaction pattern,
- empty / caveat / evidence treatment,
- drill-down location.

If two styles would share the same `hero + KPI cards + chart cards + table`
structure, the implementation is wrong.

## Source Vs Style

Source prompts define **what to analyze**.
Style prompts define **how the experience is shaped**.

When they conflict:

- Preserve source-specific analytical requirements.
- Preserve style-specific layout and component system.
- Adapt labels and modules so the result still feels native to the selected
  style.

## Implementation Rules

- Use Clockless tokens from `prompts/_design.md` as the brand base, but do not
  let those tokens flatten all styles into one look.
- Use semantic, style-specific classes such as `.lesson-stage`,
  `.atlas-timeline`, `.ops-command-bar`, `.evidence-workbench`,
  `.dossier-sheet`, not only generic `.hero`, `.card`, `.grid`.
- The first viewport should visibly reveal the selected system before the user
  scrolls.
- The primary interaction should be native to the system: a lesson stepper for
  `teaching`, selector/inspector for `interactive-studio`, filters/table for
  `dashboard`, quote/evidence browser for `editorial`, etc.
- Do not include a visible "style badge" in real generated outputs. The style
  should be obvious from the structure.
