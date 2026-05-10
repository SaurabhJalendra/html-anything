# Dashboard Style

Use this style for CSVs, spreadsheets, finance/admin data, logs, issue trackers,
calendar exports, operational records, and other structured datasets.

## Page Shape

- Put the decision surface first: KPIs, status, trend, and highest-priority
  flags.
- Use dense but readable panels, not marketing cards.
- Include filters and search when records are numerous.
- Show distributions, outliers, breakdowns, trends, and stale/duplicate/anomaly
  callouts.
- Put raw rows behind a searchable table or drill-down, not as the lead.

## Visual Language

- Use the Clockless tokens from `prompts/_design.md`.
- Quiet, utilitarian, scan-friendly.
- Compact typography and stable grid tracks.
- Use color semantically and sparingly.
- Keep charts legible at mobile widths.

## Required Modules

- KPI strip.
- Primary trend or heatmap.
- Breakdown chart.
- Flag/anomaly cards.
- Filter/search controls.
- Searchable detail table.

## Avoid

- Oversized hero sections.
- Decorative gradients or image-heavy composition.
- Too many chart colors.
- Hiding caveats for finance, legal, medical, or other sensitive data.

## Implementation Notes

- Use tabular numerics where possible.
- Make sorting/filtering client-side and local.
- Never provide tax, accounting, investment, legal, or medical advice.
