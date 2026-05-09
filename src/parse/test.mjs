/**
 * Smoke test for the PDF + DOCX parsers. Runs against the synthetic
 * fixtures committed under examples/pdf and examples/docx.
 *
 *   npm test
 *
 * Verifies:
 *   - parser pickers route to the right parser by extension
 *   - parsed output has the expected contentType / shape
 *   - text was actually extracted (word count > 0, first heading present)
 *   - data is large enough to render a meaningful page
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import * as path from "node:path"
import { fileURLToPath } from "node:url"
import { pickParser } from "../../dist/parse/index.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO = path.resolve(__dirname, "..", "..")

test("pdf parser extracts text + headings from the synthetic fixture", async () => {
  const fp = path.join(REPO, "examples/pdf/input.pdf")
  const parser = await pickParser(fp)
  assert.equal(parser?.name, "pdf")
  const out = await parser.parse(fp)
  assert.equal(out.contentType, "pdf-document")
  assert.equal(out.meta.sourceFile, "input.pdf")
  assert.ok(out.meta.sizeBytes > 5_000, `sizeBytes too small: ${out.meta.sizeBytes}`)
  assert.ok(out.meta.pageCount >= 6, `expected >= 6 pages, got ${out.meta.pageCount}`)
  assert.ok(out.meta.wordCount > 800, `expected > 800 words, got ${out.meta.wordCount}`)
  assert.ok(out.data.text.includes("Mid-Market Battery Storage"))
  assert.ok(out.data.headings.length > 0)
  // Section nav must be able to address pages.
  for (const h of out.data.headings) {
    assert.ok(h.page >= 1 && h.page <= out.meta.pageCount)
    assert.ok(h.text.length > 0)
  }
})

test("docx parser extracts headings + plain text from the synthetic fixture", async () => {
  const fp = path.join(REPO, "examples/docx/input.docx")
  const parser = await pickParser(fp)
  assert.equal(parser?.name, "docx")
  const out = await parser.parse(fp)
  assert.equal(out.contentType, "docx-document")
  assert.equal(out.meta.sourceFile, "input.docx")
  assert.ok(out.meta.wordCount > 500, `expected > 500 words, got ${out.meta.wordCount}`)
  assert.ok(out.meta.headingCount >= 5, `expected >= 5 headings, got ${out.meta.headingCount}`)
  // mammoth's markdown output is what we'll render client-side.
  assert.ok(out.data.markdown.length > 1000)
  assert.ok(out.data.markdown.includes("RFC-014") || out.data.markdown.includes("Pricing Page"))
  // Heading labels should not contain markdown escape backslashes (common
  // mammoth artifact we strip before exposing the heading list).
  for (const h of out.data.headings) {
    assert.ok(!/\\[\\.*_+\-#]/.test(h.text), `heading still contains md-escape: ${h.text}`)
  }
})

test("htmlize fallback: source-prompt resolution covers pdf-document + docx-document", async () => {
  const { parsers } = await import("../../dist/parse/index.js")
  const names = parsers.map(p => p.name)
  assert.ok(names.includes("pdf"))
  assert.ok(names.includes("docx"))
})
