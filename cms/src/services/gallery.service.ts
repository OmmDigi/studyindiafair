import { api } from '@/lib/api'
import type { GalleryItem, GalleryMediaType } from '@/types/gallery'

export type GalleryListParams = {
  category_id: number
  is_active?: boolean
}

export type GalleryCreatePayload = {
  category_id: number
  is_active: boolean
  items: (
    | { media_type: 'image'; image_path: string; alt_text: string | null }
    | { media_type: 'youtube'; youtube_url: string; alt_text: string | null }
  )[]
}

export type GalleryUpdatePayload = {
  category_id: number
  media_type: GalleryMediaType
  image_path: string
  youtube_url: string
  alt_text: string | null
  is_active: boolean
}

export const galleryService = {
  list: (params: GalleryListParams) => api.get<GalleryItem[]>('/gallery', { params }).then((r) => r.data),
  create: (data: GalleryCreatePayload) => api.post<GalleryItem[]>('/gallery', data).then((r) => r.data),
  update: (id: number, data: Partial<GalleryUpdatePayload>) =>
    api.patch<GalleryItem>(`/gallery/${id}`, data).then((r) => r.data),
  reorder: (category_id: number, ids: number[]) =>
    api.put<GalleryItem[]>('/gallery/reorder', { category_id, ids }).then((r) => r.data),
  remove: (id: number) => api.delete(`/gallery/${id}`),
}
