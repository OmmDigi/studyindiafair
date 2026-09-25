import { api } from '@/lib/api'
import type { PageSeo, PageSeoSummary } from '@/types/seo'

export type SeoPayload = Omit<PageSeo, 'page_id' | 'page_name' | 'page_slug' | 'updated_at'>

export const seoService = {
  list: () => api.get<PageSeoSummary[]>('/seo').then((r) => r.data),
  get: (pageId: number) => api.get<PageSeo>(`/seo/${pageId}`).then((r) => r.data),
  save: (pageId: number, data: SeoPayload) => api.put<PageSeo>(`/seo/${pageId}`, data).then((r) => r.data),
}
