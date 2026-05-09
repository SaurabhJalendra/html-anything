#!/usr/bin/env node
/**
 * html-anything CLI entry point.
 *
 *   html-anything <input>             produce <input-stem>.html beside it
 *   html-anything <input> --out X     write to X
 *   html-anything <input> --no-ai     skip LLM enrichment
 *   html-anything <input> --inline-media   base64 photos/voice into the HTML
 */
import * as fs from "node:fs/promises"
import * as path from "node:path"
import { converters } from "./converters/index.js"
import { makeLlm } from "./llm.js"
import type { ConverterOptions } from "./types.js"

interface ParsedArgs {
  input: string
  out?: string
  options: ConverterOptions
  help: boolean
  version: boolean
}

const PKG_VERSION = "0.0.1"

function parseArgs(argv: string[]): ParsedArgs {
  let input = ""
  let out: string | undefined
  let title: string | undefined
  let ai = true
  let inlineMedia = false
  let help = false
  let version = false

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === "-h" || a === "--help") help = true
    else if (a === "-V" || a === "--version") version = true
    else if (a === "--out" || a === "-o") out = argv[++i]
    else if (a === "--title") title = argv[++i]
    else if (a === "--no-ai") ai = false
    else if (a === "--ai") ai = true
    else if (a === "--inline-media") inlineMedia = true
    else if (a.startsWith("-")) throw new Error(`unknown flag: ${a}`)
    else if (!input) input = a
    else throw new Error(`unexpected positional argument: ${a}`)
  }

  return { input, out, options: { ai, inlineMedia, title }, help, version }
}

const HELP = `\
html-anything — turn any file into a beautiful, interactive, shareable HTML

Usage:
  html-anything <input>                     produce <input-stem>.html
  html-anything <input> --out OUT           write to OUT (default: alongside input)
  html-anything <input> --title "Title"     override the document title
  html-anything <input> --no-ai             skip LLM enrichment (deterministic, fast)
  html-anything <input> --inline-media      base64 binary attachments into the HTML

Available converters:
${converters.map(c => `  • ${c.name.padEnd(16)} ${c.matches.join(", ")}`).join("\n")}

Tip: the output is a single self-contained .html file. Open it in a browser,
email it as an attachment, or host it anywhere static files live.
`

async function pickConverter(filepath: string) {
  const ext = path.extname(filepath).toLowerCase()
  const candidates = converters.filter(c => c.matches.some(m => ext === m || m === "*"))
  for (const c of candidates) {
    if (!c.detect) return c
    if (await c.detect(filepath)) return c
  }
  return null
}

async function main() {
  let args: ParsedArgs
  try {
    args = parseArgs(process.argv.slice(2))
  } catch (err) {
    console.error(`html-anything: ${(err as Error).message}\n`)
    console.error(HELP)
    process.exit(2)
  }

  if (args.version) {
    console.log(PKG_VERSION)
    return
  }
  if (args.help || !args.input) {
    console.log(HELP)
    return
  }

  const filepath = path.resolve(args.input)
  try {
    await fs.access(filepath)
  } catch {
    console.error(`html-anything: input not found: ${filepath}`)
    process.exit(1)
  }

  const converter = await pickConverter(filepath)
  if (!converter) {
    console.error(`html-anything: no converter for ${path.extname(filepath) || "(no extension)"}`)
    console.error(`available: ${converters.map(c => c.matches.join("/")).join(", ")}`)
    process.exit(1)
  }

  const llm = args.options.ai ? makeLlm() : null
  if (args.options.ai && !llm) {
    console.error(`html-anything: --ai requested but no provider env var set (ANTHROPIC_API_KEY / OPENAI_API_KEY)`)
    console.error(`              re-run with --no-ai or set one of those.`)
    process.exit(1)
  }

  const html = await converter.render({ filepath, options: args.options, llm })

  const outPath = args.out
    ? path.resolve(args.out)
    : path.join(path.dirname(filepath), `${path.basename(filepath, path.extname(filepath))}.html`)
  await fs.writeFile(outPath, html, "utf8")
  console.log(`✓ ${path.basename(outPath)} (${(html.length / 1024).toFixed(1)} KB) — open in your browser`)
}

main().catch(err => {
  console.error(`html-anything: ${(err as Error).message}`)
  process.exit(1)
})
