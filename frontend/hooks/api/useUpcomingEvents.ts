import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { get } from '../../utils/fetcher';

export const useUpcomingEvents = (options?: UseQueryOptions<any, Error, any>) => {
  return useQuery({
    queryKey: ['upcoming-events'],
    queryFn: () => get('/upcoming-events/public'),
    ...options,
  });
};

export const useUpcomingEvent = (slug: string, options?: UseQueryOptions<any, Error, any>) => {
  return useQuery({
    queryKey: ['upcoming-events', slug],
    queryFn: () => get(`/upcoming-events/public/${slug}`),
    enabled: !!slug,
    ...options,
  });
};
