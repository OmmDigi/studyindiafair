import type { OutputData } from '@editorjs/editorjs'

export { editorPlainText, toEditorData } from '@/lib/editor'

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
