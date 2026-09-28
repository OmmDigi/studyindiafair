import { api } from '@/lib/api'
import type { EventImage, EventLogo, EventSchedule, UpcomingEvent } from '@/types/upcoming-event'

export type UpcomingEventListParams = {
  search?: string
  is_active?: boolean
}

export type UpcomingEventPayload = {
  name: string
  slug?: string
  images: EventImage[]
  schedules: EventSchedule[]
  is_active: boolean
}

export const upcomingEventService = {
  list: (params: UpcomingEventListParams) =>
    api.get<UpcomingEvent[]>('/upcoming-events', { params }).then((r) => r.data),
  create: (data: UpcomingEventPayload) => api.post<UpcomingEvent>('/upcoming-events', data).then((r) => r.data),
  update: (id: number, data: Partial<UpcomingEventPayload>) =>
    api.patch<UpcomingEvent>(`/upcoming-events/${id}`, data).then((r) => r.data),
  updateLogos: (id: number, logos: EventLogo[]) =>
    api.put<UpcomingEvent>(`/upcoming-events/${id}/logos`, { logos }).then((r) => r.data),
  reorder: (ids: number[]) => api.put<UpcomingEvent[]>('/upcoming-events/reorder', { ids }).then((r) => r.data),
  remove: (id: number) => api.delete(`/upcoming-events/${id}`),
}
