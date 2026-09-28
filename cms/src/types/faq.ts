import type { OutputData } from '@editorjs/editorjs'

export type Faq = {
  id: number
  page_slug: string
  question: string
  answer: OutputData
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}
