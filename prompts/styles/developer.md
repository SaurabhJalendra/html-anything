# Developer Style

Use this style for GitHub repos, diffs, PR patches, CI/build/test logs, stack
traces, and technical artifacts.

## Underlying System: Evidence Workbench

This is a technical investigation system. It should feel like a code review,
incident triage, or architecture inspection surface.

Base scaffold:

1. **Finding bar** — status, suspected cause/risk, changed files/failing tests,
   confidence/hypothesis labels.
2. **Evidence workbench** — file/trace/log/diff hotspots with line/path tokens
   kept close to claims.
3. **Risk checklist** — concrete findings ordered by severity, each grounded
   in evidence.
4. **Artifact navigator** — collapsible raw diff/log/trace/tree, filtered by
   file, severity, frame, or token.
5. **Copyable handoff** — Markdown summary for PR comment, ticket, or incident
   note.

Component vocabulary:

- `.dev-shell`, `.finding-bar`, `.evidence-workbench`, `.hotspot-map`,
  `.risk-checklist`, `.raw-artifact`, `.frame-stack`, `.copy-handoff`,
  `.hypothesis-chip`.
- Use monospace, line numbers, filenames, status chips, and severity labels.

Interaction model:

- Every inferred claim is labeled as hypothesis unless directly evidenced.
- Clicking a finding should jump to or reveal supporting raw evidence.
- Raw artifact is available but never the first thing the user has to parse.

## Page Shape

- Lead with what matters: likely cause, risk, architecture shape, or review
  findings.
- Keep evidence close to claims.
- Use technical panels: file tree, stack frames, failing tests, diff hotspots,
  dependency or module map, risk checklist.
- Provide collapsible raw evidence so the page remains auditable.
- Include copyable summaries when useful for PRs, tickets, or incident notes.

## Visual Language

- Use the Clockless tokens from `prompts/_design.md`.
- Precise, compact, code-forward.
- Monospace for code, paths, stack frames, log tokens, commit IDs, and numbers.
- Use chips for confidence, hypothesis, severity, and source file.
- Prefer calm dark/neutral surfaces when code density is high.

## Required Modules

- Summary/finding strip.
- Evidence-backed findings.
- Hotspots or architecture map.
- Raw artifact drill-down.
- Copyable technical summary.

## Avoid

- Vague "looks good" prose.
- Certainty claims for inferred root causes.
- Decorative visuals that bury file/line evidence.
- Large unstructured log dumps as the first screen.

## Implementation Notes

- Label inferred causes as hypotheses.
- Keep file paths and line references copyable.
- Do not mutate source code from a generated report unless the user asked for a
  code change.
