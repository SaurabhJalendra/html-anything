# Relationship Style

Use this style for 1:1 chats, couple/friend/family conversations, and intimate
message exports.

## Page Shape

- Aggregate-first. Do not lead with raw messages.
- Show relationship rhythm: total messages, active days, quiet days, response
  lag, who starts topics, who ends threads, late-night share.
- Show time patterns with calendar heatmaps, hour-of-day bars, monthly arcs,
  and notable spikes.
- Show language fingerprints: shared words, distinct words, tone clusters,
  media/sticker/voice/deleted-message counts when available.
- Pair claims with tiny anonymized evidence snippets.

## Visual Language

- Use the Clockless tokens from `prompts/_design.md`.
- Keep the tone intimate but not cheesy.
- Use warm surfaces, soft comparison colors, and compact labels.
- Prefer anonymity by default: Person A / Person B or initials.

## Required Modules

- Overview metrics.
- Activity heatmap.
- Interaction rhythm and response timing.
- Topic/language section.
- Evidence snippets for selected insights.
- Searchable or expandable message detail only if the user asks.

## Avoid

- "Who loves more" claims.
- Raw-message appendix by default.
- Overly sweet labels that make synthetic examples feel fake.
- Identifying names, phone numbers, addresses, or private handles unless the
  user explicitly asks.

## Implementation Notes

- Treat the generated HTML as sensitive.
- Use small samples for evidence and mask names.
- Make uncertainty visible for inferred sentiment or relationship claims.
