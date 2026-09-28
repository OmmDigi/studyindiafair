import { api } from '@/lib/api'
import type { Scholarship, ScholarshipPayload } from '@/types/scholarship'

export const scholarshipService = {
  get: () => api.get<Scholarship>('/scholarship').then((r) => r.data),
  update: (data: ScholarshipPayload) => api.put<Scholarship>('/scholarship', data).then((r) => r.data),
}
