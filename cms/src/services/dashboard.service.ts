import { api } from '@/lib/api'
import type { EnquiryStats } from '@/types/dashboard'

export type DateRange = { from?: string; to?: string }

export const dashboardService = {
  enquiryStats: (params: DateRange) =>
    api.get<EnquiryStats>('/dashboard/enquiries', { params }).then((r) => r.data),
}
