import { api } from '@/lib/api'
import type { GalleryCategory } from '@/types/gallery'

export type GalleryCategoryPayload = {
  name: string
  slug: string
  is_active: boolean
}

export const galleryCategoryService = {
  list: () => api.get<GalleryCategory[]>('/gallery-categories').then((r) => r.data),
  create: (data: GalleryCategoryPayload) =>
    api.post<GalleryCategory>('/gallery-categories', data).then((r) => r.data),
  update: (id: number, data: Partial<GalleryCategoryPayload>) =>
    api.patch<GalleryCategory>(`/gallery-categories/${id}`, data).then((r) => r.data),
  reorder: (ids: number[]) => api.put<GalleryCategory[]>('/gallery-categories/reorder', { ids }).then((r) => r.data),
  remove: (id: number) => api.delete(`/gallery-categories/${id}`),
}
