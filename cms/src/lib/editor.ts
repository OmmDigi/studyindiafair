import type { OutputData } from '@editorjs/editorjs'

export function toEditorData(content: unknown): OutputData | null {
  if (!content) return null
  if (typeof content === 'object') return content as OutputData
  if (typeof content !== 'string') return null
  try {
    const parsed = JSON.parse(content)
    if (parsed && Array.isArray(parsed.blocks)) return parsed
  } catch {}
  return { time: Date.now(), blocks: [{ type: 'paragraph', data: { text: content } }] }
}

export function editorPlainText(content: unknown) {
  const data = toEditorData(content)
  if (!data?.blocks?.length) return ''
  const div = document.createElement('div')
  return data.blocks
    .map((b) => {
      const d = b.data as Record<string, unknown>
      const raw = typeof d.text === 'string' ? d.text : typeof d.caption === 'string' ? d.caption : ''
      div.innerHTML = raw
      return div.textContent ?? ''
    })
    .filter(Boolean)
    .join(' ')
}
