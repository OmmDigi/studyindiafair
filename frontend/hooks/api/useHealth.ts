import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { get } from '../../utils/fetcher';

export const useHealthCheck = (options?: UseQueryOptions<any, Error, any>) => {
  return useQuery({
    queryKey: ['health'],
    queryFn: () => get(process.env.NEXT_PUBLIC_API_BASE_URL ? `${process.env.NEXT_PUBLIC_API_BASE_URL.replace('/api/v1', '')}/health` : 'http://localhost:4000/health'),
    ...options,
  });
};
