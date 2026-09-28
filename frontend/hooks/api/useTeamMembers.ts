import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { get } from '../../utils/fetcher';

export const useTeamMembers = (limit?: number, options?: UseQueryOptions<any, Error, any>) => {
  return useQuery({
    queryKey: ['team-members', limit],
    queryFn: () => {
      const params = new URLSearchParams();
      if (limit) params.append('limit', limit.toString());
      const queryString = params.toString();
      return get(`/team-members/public${queryString ? `?${queryString}` : ''}`);
    },
    ...options,
  });
};
