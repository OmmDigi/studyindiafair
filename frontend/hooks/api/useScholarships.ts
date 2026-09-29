import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { get } from '../../utils/fetcher';

export const useScholarships = (options?: UseQueryOptions<any, Error, any>) => {
  return useQuery({
    queryKey: ['scholarships'],
    queryFn: () => get('/scholarship/public'),
    ...options,
  });
};
