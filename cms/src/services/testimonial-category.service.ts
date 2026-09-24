import { api } from '@/lib/api'
import type { TestimonialCategory } from '@/types/testimonial-category'

export type TestimonialCategoryListParams = {
  search?: string
  is_active?: boolean
}

export type TestimonialCategoryPayload = {
  name: string
  slug: string
  sort_order: number
  is_active: boolean
}

export const testimonialCategoryService = {
  list: (params: TestimonialCategoryListParams = {}) =>
    api.get<TestimonialCategory[]>('/testimonial-categories', { params }).then((r) => r.data),
  create: (data: TestimonialCategoryPayload) =>
    api.post<TestimonialCategory>('/testimonial-categories', data).then((r) => r.data),
  update: (id: number, data: Partial<TestimonialCategoryPayload>) =>
    api.patch<TestimonialCategory>(`/testimonial-categories/${id}`, data).then((r) => r.data),
  remove: (id: number) => api.delete(`/testimonial-categories/${id}`),
}
