/**
 * The contract every converter implements. A converter is a single file in
 * src/converters/<name>.ts that exports `converter` matching this shape.
 *
 * The CLI loads every converter once at startup, asks each whether it
 * `matches` the input file, and runs the first one that says yes.
 */
export interface Converter {
  /** Human-readable name shown in --help and stamped into the output meta. */
  name: string

  /**
   * File extensions (with the leading dot) and / or MIME types this converter
   * is willing to handle. The first cheap filter — most converters get past
   * here without `detect` doing anything.
   */
  matches: readonly string[]

  /**
   * Optional second-pass check. If a converter cares about content (e.g.
   * a `.txt` that's actually a WhatsApp export, distinguished by the
   * `[2024-01-01, 12:00:00]` line prefix), implement it here. Cheap I/O
   * only — the runner short-circuits on the first `true`.
   */
  detect?: (filepath: string) => Promise<boolean> | boolean

  /**
   * Produce a single self-contained HTML string from the input. Use the
   * shared `<DocShell>` (src/shared/shell.ts) for layout / dark mode /
   * search; the converter's job is to turn the file into the right
   * sections, lists, timeline, table — whatever the format calls for.
   */
  render: (input: ConverterInput) => Promise<string>
}

export interface ConverterInput {
  /** Absolute path to the input file or directory. */
  filepath: string

  /** Resolved CLI options. */
  options: ConverterOptions

  /** Access to an LLM if `options.ai` is true; null otherwise. */
  llm: LlmHelper | null
}

export interface ConverterOptions {
  /** When false, converters skip any LLM calls and produce deterministic output. */
  ai: boolean

  /** When true, base64-inline binary attachments (photos, voice notes). */
  inlineMedia: boolean

  /** Optional override for the output title in the HTML <title> + header. */
  title?: string
}

/**
 * The minimal LLM helper a converter sees. Intentionally small — we want
 * converters to be portable across providers (Claude, GPT, Gemini, local).
 * The implementation lives in src/llm.ts and reads env vars to pick a
 * provider; converters never touch credentials directly.
 */
export interface LlmHelper {
  /**
   * One-shot prompt → text. Use for short structural enrichment
   * (chapter titles, summaries, tags). Don't use for "render the whole
   * document" — converters do the layout.
   */
  ask: (prompt: string, opts?: { model?: string; maxTokens?: number }) => Promise<string>
}
