# Style Catalog

These style prompts define the reusable **underlying page systems** for
html-anything. Source prompts answer "what is in this input?" Style prompts
answer "what system should shape the HTML experience?"

Styles are not skins. A style must change the page shell, first viewport,
component vocabulary, interaction model, density, chart grammar, and voice.
The shared contract is [`_system.md`](./_system.md).

The default is `auto`: the agent picks a style from the request and source.

## Current Styles

| Style | Use when | Core shape |
|---|---|---|
| `default` | The input does not clearly fit a specialized style | Clean live page with strong summary, useful sections, and practical drill-down |
| `teaching` | Tutorial, lesson, "teach me", explainer, course-like page | Visual stage, step rail, try-it control, check-yourself, recap |
| `interactive-studio` | Object/system/science/product/spec exploration | App-like lab with selector, stage, inspector, comparison, controls |
| `relationship` | 1:1 chats and intimate message exports | Aggregate-first relationship rhythm report with anonymized evidence |
| `dashboard` | Operational, tabular, finance, admin, log, planning data | Dense KPIs, charts, filters, flags, searchable table |
| `personal-atlas` | Personal exports and life-history datasets | Memory atlas with timelines, clusters, highlights, searchable drill-down |
| `editorial` | Essays, articles, reading lists, research collections | Magazine-like story, section rhythm, pull quotes, claims, topic cards |
| `developer` | Repos, diffs, PRs, CI logs, traces | Evidence-based technical report with risks, hotspots, raw evidence |
| `paper` | Long documents, PDFs, DOCX, legal/medical/lab records | Conservative structured review with caveats, evidence, definitions |

## System Names

| Style | Underlying system |
|---|---|
| `default` | Insight Brief |
| `teaching` | Lesson Lab |
| `interactive-studio` | Object Studio |
| `relationship` | Rhythm Report |
| `dashboard` | Ops Console |
| `personal-atlas` | Memory Atlas |
| `editorial` | Editorial Desk |
| `developer` | Evidence Workbench |
| `paper` | Review Dossier |

## Notes From DESIGN.md Libraries

The VoltAgent `awesome-design-md` project is useful as a design prompt pattern,
not as a brand library to copy. It shows that a good style file should include:

- visual theme and atmosphere,
- color roles,
- typography rules,
- component behavior,
- layout principles,
- depth and elevation,
- do/don't guardrails,
- responsive behavior,
- quick agent instructions.

For html-anything, keep Clockless tokens from `prompts/_design.md` as the brand
base. Borrow archetypes, not brand identities:

- warm workspace/editorial systems -> `default`, `editorial`, `personal-atlas`
- precision product/dark app systems -> `dashboard`, `developer`
- cinematic object galleries -> `interactive-studio`, `teaching`
- broadsheet/media systems -> `editorial`, `paper`
- data-infrastructure systems -> `dashboard`, `developer`
- playful canvas systems -> `teaching`, `personal-atlas`

Do not ask users to pick from these by default. Choose internally unless the
user explicitly asks for style options.
