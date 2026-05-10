# Interactive Studio Style

Use this style for objects, systems, products, scientific topics, architecture,
anatomy, specs, and "explain this system" briefs where the user should explore
an object rather than read a report.

## Page Shape

- Open with the object or system itself: canvas, SVG, generated image, 3D scene,
  diagram, map, model, or visual stage.
- Add a selector or mode switch for the main entities.
- Add an inspector panel that changes with the selected object/state.
- Add at least one comparison, scale, layer, or timeline control.
- Keep the experience app-like: the first screen should already be usable.

## Visual Language

- Use the Clockless tokens from `prompts/_design.md`.
- Let the subject carry the page. Use generated bitmap assets for rich visual
  subjects, and SVG/canvas/CSS for deterministic labels and motion.
- Use strong spatial organization: stage, controls, inspector, comparison.
- Keep labels near the things they describe.

## Required Modules

- Main stage or model.
- Entity selector.
- Live inspector.
- Comparison or scale view.
- Control strip with clear icon/text labels.

## Avoid

- A decorative hero followed by static facts.
- Dozens of separate cards that make the object feel fragmented.
- Motion that does not change understanding.

## Implementation Notes

- Verify the stage is nonblank at desktop and mobile sizes.
- Provide a pause/reduce-motion option for looping animation.
- Keep layout stable when selecting different entities.
