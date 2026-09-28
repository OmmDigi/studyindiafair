import type { OutputData } from '@editorjs/editorjs'
import { api } from '@/lib/api'
import type { Paginated } from '@/types/auth'
import type { TeamMember } from '@/types/team-member'

export type TeamMemberListParams = {
  search?: string
  is_active?: boolean
  page?: number
  limit?: number
}

export type TeamMemberPayload = {
  name: string
  designation: string
  details: OutputData | null
  image_path: string | null
  position?: number
  is_active: boolean
}

export const teamMemberService = {
  list: (params: TeamMemberListParams) =>
    api.get<Paginated<TeamMember>>('/team-members', { params }).then((r) => r.data),
  create: (data: TeamMemberPayload) => api.post<TeamMember>('/team-members', data).then((r) => r.data),
  update: (id: number, data: Partial<TeamMemberPayload>) =>
    api.patch<TeamMember>(`/team-members/${id}`, data).then((r) => r.data),
  move: (id: number, direction: 'up' | 'down') =>
    api.post<TeamMember>(`/team-members/${id}/move`, { direction }).then((r) => r.data),
  remove: (id: number) => api.delete(`/team-members/${id}`),
}
