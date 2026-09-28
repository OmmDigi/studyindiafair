import type { OutputData } from '@editorjs/editorjs'
import { api } from '@/lib/api'
import type { Paginated } from '@/types/auth'
import type { Faq } from '@/types/faq'

export type FaqListParams = {
  search?: string
  page_slug?: string
  is_active?: boolean
  page?: number
  limit?: number
}

export type FaqPayload = {
  page_slug: string
  question: string
  answer: OutputData | null
  sort_order: number
  is_active: boolean
}

export const faqService = {
  list: (params: FaqListParams) => api.get<Paginated<Faq>>('/faqs', { params }).then((r) => r.data),
  create: (data: FaqPayload) => api.post<Faq>('/faqs', data).then((r) => r.data),
  update: (id: number, data: Partial<FaqPayload>) => api.patch<Faq>(`/faqs/${id}`, data).then((r) => r.data),
  remove: (id: number) => api.delete(`/faqs/${id}`),
}
