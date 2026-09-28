import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { get } from '../../utils/fetcher';

export const useTestimonialCategories = (options?: UseQueryOptions<any, Error, any>) => {
  return useQuery({
    queryKey: ['testimonial-categories'],
    queryFn: () => get('/testimonial-categories/public'),
    ...options,
  });
};

export const useTestimonials = (params?: { type?: string; category?: string; limit?: number }, options?: UseQueryOptions<any, Error, any>) => {
  return useQuery({
    queryKey: ['testimonials', params],
    queryFn: () => {
      const queryParams = new URLSearchParams();
      if (params?.type) queryParams.append('type', params.type);
      if (params?.category) queryParams.append('category', params.category);
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      const queryString = queryParams.toString();
      return get(`/testimonials/public${queryString ? `?${queryString}` : ''}`);
    },
    ...options,
  });
};
