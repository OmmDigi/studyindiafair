import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { post } from '../../utils/fetcher';

export const useSubmitEnquiry = (formId: string, options?: UseMutationOptions<any, Error, any>) => {
  return useMutation({
    mutationFn: (data: any) => post(`/forms/${formId}/enquiries`, data),
    ...options,
  });
};
