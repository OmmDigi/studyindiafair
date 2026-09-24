export type GalleryMediaType = 'image' | 'youtube'

export type GalleryCategory = {
  id: number
  name: string
  slug: string
  position: number
  is_active: boolean
  item_count: number
  cover_image: string | null
  created_at: string
  updated_at: string
}

export type GalleryItem = {
  id: number
  category_id: number
  media_type: GalleryMediaType
  image_path: string | null
  youtube_id: string | null
  alt_text: string | null
  position: number
  is_active: boolean
  created_at: string
  updated_at: string
}
