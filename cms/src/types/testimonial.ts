import type { OutputData } from '@editorjs/editorjs'

export const TESTIMONIAL_TYPES = ['text', 'text_image', 'video'] as const
export type TestimonialType = (typeof TESTIMONIAL_TYPES)[number]

export const TESTIMONIAL_TYPE_LABELS: Record<TestimonialType, string> = {
  text: 'Text',
  text_image: 'Text + Image',
  video: 'YouTube Video',
}

export type Testimonial = {
  id: number
  type: TestimonialType
  category_id: number
  category_name: string
  category_slug: string
  name: string
  designation: string | null
  content: OutputData | null
  image_path: string | null
  youtube_id: string | null
  youtube_url: string | null
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

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
