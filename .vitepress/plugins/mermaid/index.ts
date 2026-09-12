import type { MarkdownRenderer } from 'vitepress'

/**
 * Turns a ```mermaid fence into a <Mermaid> component call.
 *
 * The diagram source travels URL-encoded so that quotes, angle brackets
 * and braces inside it never reach the Vue template compiler; the
 * component decodes it on the client and renders with the Mermaid API.
 * No third-party VitePress plugin is involved (none of them supports
 * VitePress 2 yet).
 */
export function mermaidPlugin(md: MarkdownRenderer): void {
  const fence = md.renderer.rules.fence!
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    if (token.info.trim() === 'mermaid') {
      return `<Mermaid code="${encodeURIComponent(token.content)}" />\n`
    }
    return fence(tokens, idx, options, env, self)
  }
}
