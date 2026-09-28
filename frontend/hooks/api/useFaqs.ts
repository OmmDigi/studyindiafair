import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { get } from '../../utils/fetcher';

export const useFaqs = (pageSlug: string, limit?: number, options?: UseQueryOptions<any, Error, any>) => {
  return useQuery({
    queryKey: ['faqs', pageSlug, limit],
    queryFn: () => {
      console.log("useFaqs queryFn called with pageSlug:", pageSlug);
      const params = new URLSearchParams();
      if (pageSlug) params.append('page_slug', pageSlug);
      if (limit) params.append('limit', limit.toString());
      return get(`/faqs/public?${params.toString()}`);
    },
    enabled: !!pageSlug,
    ...options,
  });
};
