import { api } from '@/lib/api'
import type { Paginated } from '@/types/auth'
import type { Enquiry, Form } from '@/types/form'

export type FormPayload = {
  name: string
  form_id: string
}

export type EnquiryFilter = { search?: string; from?: string; to?: string }
export type EnquiryListParams = EnquiryFilter & { page?: number; limit?: number }

export const formService = {
  list: (params: { search?: string } = {}) => api.get<Form[]>('/forms', { params }).then((r) => r.data),
  get: (id: number) => api.get<Form>(`/forms/${id}`).then((r) => r.data),
  create: (data: FormPayload) => api.post<Form>('/forms', data).then((r) => r.data),
  update: (id: number, data: Partial<FormPayload>) => api.patch<Form>(`/forms/${id}`, data).then((r) => r.data),
  remove: (id: number) => api.delete(`/forms/${id}`),
  enquiries: (id: number, params: EnquiryListParams) =>
    api.get<Paginated<Enquiry>>(`/forms/${id}/enquiries`, { params }).then((r) => r.data),
  exportEnquiries: (id: number, params: EnquiryFilter) =>
    api.get<Blob>(`/forms/${id}/enquiries/export`, { params, responseType: 'blob' }).then((r) => r.data),
  removeEnquiry: (id: number, enquiryId: number) => api.delete(`/forms/${id}/enquiries/${enquiryId}`),
}
