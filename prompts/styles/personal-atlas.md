# Personal Atlas Style

Use this style for personal exports and life-history datasets: Amazon orders,
Spotify, YouTube, Google Maps, Photos metadata, Health, Kindle, contacts,
payments, and similar archives.

## Page Shape

- Make the page feel like a memory atlas, not an admin dashboard.
- Lead with coverage: time span, totals, top patterns, and one memorable
  surprise.
- Use timelines, maps, calendars, category clusters, streaks, and "rediscovery"
  cards.
- Include searchable drill-down, but let memories and patterns lead.
- Use human labels: "what changed", "what repeated", "what you forgot", "what
  defines this period".

## Visual Language

- Use the Clockless tokens from `prompts/_design.md`.
- Warm, personal, quietly expressive.
- Generated or procedural visuals are useful when they represent memories,
  places, objects, or media without leaking private assets.
- Use icons sparingly to make categories scannable.

## Required Modules

- Coverage strip.
- Time rhythm.
- Category/topic clusters.
- Highlight or rediscovery cards.
- Searchable item browser.
- Privacy note when data may be sensitive.

## Avoid

- Treating personal data like an enterprise BI dashboard.
- Embedding private media unless the user asks.
- Calling heuristics certain.
- Making the page feel like surveillance.

## Implementation Notes

- Mask identifiers by default for contacts, payments, chats, and private
  records.
- Prefer metadata-only analysis for photos unless asked otherwise.
- Keep everything static and local-first.
