# Personal Atlas Style

Use this style for personal exports and life-history datasets: Amazon orders,
Spotify, YouTube, Google Maps, Photos metadata, Health, Kindle, contacts,
payments, and similar archives.

## Underlying System: Memory Atlas

This is a personal archive system. It should feel like rediscovering a period
of life, not running an admin report.

Base scaffold:

1. **Memory cover** — time span, coverage, total volume, and one "you might
   have forgotten this" pattern.
2. **Timeline spine** — year/month/day rhythm as the main navigation.
3. **Cluster map** — places, categories, people, artists, vendors, books,
   devices, channels, or recurring motifs depending on source.
4. **Rediscovery cards** — notable repeated things, one-off spikes, streaks,
   returns, forgotten items, late-night patterns, or location clusters.
5. **Private browser** — searchable drill-down with masks and privacy notes.

Component vocabulary:

- `.atlas-shell`, `.memory-cover`, `.timeline-spine`, `.cluster-map`,
  `.rediscovery-card`, `.period-scrubber`, `.private-browser`,
  `.privacy-caveat`.
- Use map/timeline/calendar metaphors where the data supports them.

Interaction model:

- Clicking a period or cluster filters highlights and the browser.
- Use labels like "what repeated", "what changed", "what you forgot",
  "where this period lived".
- Avoid enterprise terms like "performance", "pipeline", or "utilization"
  unless the source is actually operational.

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
