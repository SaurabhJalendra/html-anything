# csv — tabular data

CSV / TSV. Parser detected the separator and identified numeric columns.

## Layout decisions by shape

Look at `meta.rowCount`, `meta.columnCount`, `meta.numericColumns`:

- **< 200 rows** → full table on the page. Sortable headers. Sticky
  header on scroll. Numeric columns right-aligned.
- **200 – 5,000 rows** → full table with virtualized scroll OR
  client-side pagination (50 rows per page). Filter input per column.
- **> 5,000 rows** → summary panel at top (totals, averages, top values
  per column for top numeric column), then a virtualized scroll table.
  Search filters across all columns.
- **Lots of numeric columns (> 3)** → add a small chart at the top
  (bar/line) showing the dominant numeric column over time/category if
  there's a date or category column. Use Canvas, not SVG, for > 1000
  rows of data points.

## Always include

- Sticky header. Click any column to sort asc/desc. Numeric columns
  use numeric compare; others alphabetical.
- Top search box that filters rows by any cell content.
- Row count + active filter status above the table.
- Numeric columns right-aligned with `font-variant-numeric: tabular-nums`.
- Truncate long cells with ellipsis; show full content on hover or click.

## Data shape

```ts
DATA = {
  headers: ["order_id", "date", "region", ...],
  rows: [
    ["ORD-1042", "2026-01-04", "West", "Espresso Machine", "12", "499.00", "5988.00", "Mira Park"],
    ...
  ],
  rowCount: 46,
  columnCount: 8,
  numericColumns: ["units", "unit_price", "revenue"],
  separator: ",",
  meta: { sourceFile, sizeBytes }
}
```

## Tone

Data-dense, tight. System-mono for numerics. Clean utilitarian look —
no unnecessary chrome.
