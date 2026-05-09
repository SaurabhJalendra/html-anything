# whatsapp — `_chat.txt` export

A WhatsApp export. Parser already extracted messages with timestamps,
senders, and media flags.

## Layout decisions by shape

Look at `meta.senderCount`, `meta.messageCount`, `meta.dateRange`,
`meta.mediaCount` to choose:

- **2 senders, < 1000 messages** → bubble timeline grouped by day. Two
  alternating column alignments (left for one sender, right for the
  other). Sender colors. Date dividers.
- **3–10 senders, < 5000 messages** → bubble timeline with sender
  pills + sender filter chips at the top.
- **> 10 senders OR > 10K messages** → fold by sender (collapsed by
  default), top-contributor stats at the top, virtual scroll inside
  expanded views. Add a date filter (year + month picker).
- **Lots of media** (> 20% of messages) → emphasize media tiles inline,
  add a "Media only" toggle.

## Always include

- Sender filter (chips at the top, click to toggle).
- Date jump (sticky month nav on the right rail, or year-month dropdown
  for short chats).
- Search box that filters messages live (matching the text and the
  sender; show match count).
- Sender stats panel collapsed by default (message count per sender,
  emoji frequency, busiest day).
- "Copy message as Markdown" on hover (small clipboard icon).

## Data shape

```ts
DATA = {
  messages: [
    { ts: "2026-01-04 09:12:07", date: "2026-01-04", time: "09:12:07",
      sender: "Alex Chen", text: "...", isMedia?: boolean }
  ],
  senders: ["Alex Chen", "Mira Park"],
  messagesPerSender: { "Alex Chen": 42, "Mira Park": 41 },
  dateRange: "2026-01-04 → 2026-02-02",
  messageCount: 83,
  senderCount: 2,
  mediaCount: 1,
  meta: { sourceFile, sizeBytes, ... }
}
```

## Tone

Conversational typography. Lighter weight body. The whole thing should
feel like a chat client, not a database export.
