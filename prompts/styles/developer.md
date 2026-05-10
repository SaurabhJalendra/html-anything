# Developer Style

Use this style for GitHub repos, diffs, PR patches, CI/build/test logs, stack
traces, and technical artifacts.

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
