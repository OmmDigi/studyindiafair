import { api } from '@/lib/api'
import type { Paginated } from '@/types/auth'
import type { OutputData } from '@editorjs/editorjs'
import type { Testimonial, TestimonialType } from '@/types/testimonial'

export type TestimonialListParams = {
  search?: string
  type?: TestimonialType
  is_active?: boolean
  page?: number
  limit?: number
}

export type TestimonialPayload = {
  type: TestimonialType
  name: string
  designation: string
  content: OutputData | null
  image_path: string | null
  youtube_url: string
  sort_order: number
  is_active: boolean
}

export const testimonialService = {
  list: (params: TestimonialListParams) =>
    api.get<Paginated<Testimonial>>('/testimonials', { params }).then((r) => r.data),
  create: (data: TestimonialPayload) => api.post<Testimonial>('/testimonials', data).then((r) => r.data),
  update: (id: number, data: Partial<TestimonialPayload>) =>
    api.patch<Testimonial>(`/testimonials/${id}`, data).then((r) => r.data),
  remove: (id: number) => api.delete(`/testimonials/${id}`),
}
