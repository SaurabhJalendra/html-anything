# Default Style

Use this style when the request or source does not clearly demand a specialized
shape. The default should still feel designed and intentional, not like a plain
document dump.

## Page Shape

- Start with a concise answer to "what is this?" and "why should I care?"
- Put the most useful summary or interaction in the first viewport.
- Organize the rest into 3-6 clear sections based on the source: highlights,
  timeline, themes, notable records, flags, and searchable detail.
- Include a drill-down when the source has many records.
- Prefer one strong visual story over many small decorative charts.

## Visual Language

- Use the Clockless tokens from `prompts/_design.md`.
- Warm, clean, readable, and practical.
- Use cards only for repeated items or genuinely grouped panels.
- Use restrained accent color for the most important numbers, links, and active
  states.

## Avoid

- Generic landing-page hero copy.
- Explaining the internal pipeline.
- Showing raw data before the useful interpretation.
- Overfitting to a source type that is only weakly detected.

## Implementation Notes

- Mobile-first, inline CSS and JS, no external JS/CDN.
- Add search/filter/copy only where they help the user use the page.
- If the source is private, mask identifiers unless the user asks otherwise.
