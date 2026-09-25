import { useQuery, useQueryClient } from '@tanstack/react-query'
import { pageService } from '@/services/page.service'

export const PAGES_KEY = ['pages']

export function usePages() {
  return useQuery({
    queryKey: PAGES_KEY,
    queryFn: () => pageService.list(),
  })
}

export function useRefreshPages() {
  const qc = useQueryClient()
  return () => {
    qc.invalidateQueries({ queryKey: PAGES_KEY })
    qc.invalidateQueries({ queryKey: ['faqs'] })
  }
}
