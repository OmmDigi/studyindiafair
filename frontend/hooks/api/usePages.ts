import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { get } from '../../utils/fetcher';

export const usePages = (options?: UseQueryOptions<any, Error, any>) => {
  return useQuery({
    queryKey: ['pages'],
    queryFn: () => get('/pages/public'),
    ...options,
  });
};

export const usePageSeo = (slug: string, options?: UseQueryOptions<any, Error, any>) => {
  return useQuery({
    queryKey: ['seo', slug],
    queryFn: () => get(`/seo/public/${slug}`),
    enabled: !!slug,
    ...options,
  });
};
