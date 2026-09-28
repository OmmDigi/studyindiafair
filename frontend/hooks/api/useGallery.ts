import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { get } from '../../utils/fetcher';

export const useGalleryCategories = (options?: UseQueryOptions<any, Error, any>) => {
  return useQuery({
    queryKey: ['gallery-categories'],
    queryFn: () => get('/gallery-categories/public'),
    ...options,
  });
};

export const useGallery = (params?: { category?: string; page?: number; limit?: number }, options?: UseQueryOptions<any, Error, any>) => {
  return useQuery({
    queryKey: ['gallery', params],
    queryFn: () => {
      const queryParams = new URLSearchParams();
      if (params?.category) queryParams.append('category', params.category);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      const queryString = queryParams.toString();
      return get(`/gallery/public${queryString ? `?${queryString}` : ''}`);
    },
    ...options,
  });
};
