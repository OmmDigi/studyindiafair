import { api } from '@/lib/api'
import type { Page } from '@/types/page'

export type PagePayload = {
  name: string
  slug: string
}

export const pageService = {
  list: (params: { search?: string } = {}) => api.get<Page[]>('/pages', { params }).then((r) => r.data),
  create: (data: PagePayload) => api.post<Page>('/pages', data).then((r) => r.data),
  update: (id: number, data: Partial<PagePayload>) => api.patch<Page>(`/pages/${id}`, data).then((r) => r.data),
  remove: (id: number) => api.delete(`/pages/${id}`),
}
