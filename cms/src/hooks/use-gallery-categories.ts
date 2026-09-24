import { useQuery, useQueryClient } from '@tanstack/react-query'
import { galleryCategoryService } from '@/services/gallery-category.service'

export const GALLERY_CATEGORIES_KEY = ['gallery-categories']

export function useGalleryCategories() {
  return useQuery({
    queryKey: GALLERY_CATEGORIES_KEY,
    queryFn: () => galleryCategoryService.list(),
  })
}

export function useRefreshGallery() {
  const qc = useQueryClient()
  return () => {
    qc.invalidateQueries({ queryKey: GALLERY_CATEGORIES_KEY })
    qc.invalidateQueries({ queryKey: ['gallery'] })
  }
}
