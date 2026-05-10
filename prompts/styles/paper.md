# Paper Style

Use this style for PDFs, DOCX, academic documents, legal/medical/lab records,
policy documents, and other long or high-stakes documents.

## Underlying System: Review Dossier

This is a conservative document-review system. It should feel like a structured
dossier with evidence, caveats, and traceability.

Base scaffold:

1. **Dossier cover** — document title, scope, source type, caveat, and neutral
   executive summary.
2. **Review tabs / reading modes** — quick summary, outline, evidence, dates /
   entities / definitions depending on source.
3. **Document sheet** — extracted sections or claims arranged like a review
   memo, not like a marketing page.
4. **Evidence margin** — short quoted snippets, page/section labels, ranges,
   dates, parties, or row references.
5. **Question / checklist panel** — what to ask a clinician/attorney/accountant
   or what needs human review.

Component vocabulary:

- `.dossier-shell`, `.dossier-cover`, `.review-tabs`, `.document-sheet`,
  `.evidence-margin`, `.fact-table`, `.caveat-box`, `.question-panel`.
- Use tables, definition lists, page references, and muted semantic color.

Interaction model:

- Tabs/filters move between summary, outline, evidence, and source text.
- Claims link to evidence snippets.
- Do not gamify or overdramatize sensitive documents.

## Page Shape

- Conservative, structured, evidence-first.
- Lead with a neutral summary, scope, and caveats.
- Show sections, definitions, dates, entities, claims, and evidence snippets.
- Provide reading modes: quick summary, structured outline, evidence browser.
- For sensitive/high-stakes records, include "ask a professional" questions
  instead of advice.

## Visual Language

- Use the Clockless tokens from `prompts/_design.md`.
- Quiet review surface with clear hierarchy.
- Use tables for extracted facts, timelines, ranges, and named entities.
- Keep colors muted and semantic.

## Required Modules

- Scope/caveat note.
- Executive summary.
- Section outline.
- Key facts or claims.
- Evidence snippets.
- Questions / next review checklist.
- Source text drill-down where practical.

## Avoid

- Diagnosis, legal advice, accounting/tax advice, investment advice, or
  definitive interpretation beyond the document.
- Sensational language.
- Overly playful UI.
- Unsupported conclusions.

## Implementation Notes

- Quote sparingly and cite local evidence labels.
- For lab results, compare only against the reference range printed in the row.
- For legal/medical content, stay observational and recommend professional
  review for decisions.
