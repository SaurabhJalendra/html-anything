# Editorial Style

Use this style for essays, articles, reading lists, bookmarks, research
collections, and content that benefits from narrative structure.

## Underlying System: Editorial Desk

This is a reading and argument system. It should feel edited, sequenced, and
typographically intentional.

Base scaffold:

1. **Masthead / thesis deck** — title, deck, source context, and the sharpest
   thesis or reading path.
2. **Reader rail** — section nav, reading modes, topic filters, or source
   collection tabs.
3. **Argument body** — sections with clear claims, pull quotes/evidence, and
   short contextual notes.
4. **Topic / source spread** — clusters, related links, domain/author/year
   breakdowns, or bibliography cards.
5. **Evidence browser** — excerpts, links, annotations, and search after the
   narrative spine.

Component vocabulary:

- `.editorial-shell`, `.masthead`, `.deck`, `.reader-rail`,
  `.argument-section`, `.pull-quote`, `.claim-card`, `.source-spread`,
  `.evidence-browser`.
- Use typography, rules, columns, and quote treatment more than KPI cards.

Interaction model:

- Reading modes should change density or section visibility.
- Topic/source filters support exploration but do not replace the narrative
  sequence.
- Search highlights evidence and headings.

## Page Shape

- Lead with the sharpest thesis, summary, or reading path.
- Use a magazine-like section rhythm: title, deck, pull quote, claim cards,
  topic groups, and contextual navigation.
- Preserve source nuance with quotes or evidence excerpts, but keep excerpts
  short and compliant.
- Offer reading modes when helpful: 5-minute summary, full outline, evidence
  browser.

## Visual Language

- Use the Clockless tokens from `prompts/_design.md`.
- Strong typography, clear rules, disciplined whitespace.
- Use visual density deliberately: broadsheet for many items, spacious essay
  mode for one long piece.
- Let images or generated art support the subject, not decorate the page.

## Required Modules

- TL;DR or thesis.
- Section navigation.
- Key claims or themes.
- Pull quotes / evidence snippets.
- Related topics or clusters.
- Source drill-down.

## Avoid

- A generic blog template.
- Treating every paragraph equally.
- Over-quoting source material.
- Decorative card stacks with no editorial hierarchy.

## Implementation Notes

- Respect copyright limits for quoted material.
- Prefer concise paraphrase plus short citations/excerpts.
- Keep links and source labels visible when the page is URL/research based.
