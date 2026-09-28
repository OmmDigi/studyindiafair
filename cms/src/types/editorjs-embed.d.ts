declare module '@editorjs/embed' {
  import type { BlockToolConstructable } from '@editorjs/editorjs'

  type EmbedService = {
    regex: RegExp
    embedUrl: string
    html?: string
    width?: number
    height?: number
    id?: (groups: string[]) => string
  }

  const Embed: BlockToolConstructable & { services?: Record<string, EmbedService> }
  export default Embed
}
