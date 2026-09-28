import { useQuery, useQueryClient } from '@tanstack/react-query'
import { testimonialCategoryService } from '@/services/testimonial-category.service'

export const TESTIMONIAL_CATEGORIES_KEY = ['testimonial-categories']

export function useTestimonialCategories() {
  return useQuery({
    queryKey: TESTIMONIAL_CATEGORIES_KEY,
    queryFn: () => testimonialCategoryService.list(),
  })
}

export function useRefreshTestimonialCategories() {
  const qc = useQueryClient()
  return () => {
    qc.invalidateQueries({ queryKey: TESTIMONIAL_CATEGORIES_KEY })
    qc.invalidateQueries({ queryKey: ['testimonials'] })
  }
}
