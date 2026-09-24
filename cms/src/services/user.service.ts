import { api } from '@/lib/api'
import type { ManagedUser, Paginated, Role } from '@/types/auth'

export type UserListParams = { search?: string; role?: Role; page?: number; limit?: number }
export type UserPayload = { name: string; email: string; role: Role; is_active: boolean; password?: string }

export const userService = {
  list: (params: UserListParams) => api.get<Paginated<ManagedUser>>('/users', { params }).then((r) => r.data),
  create: (data: UserPayload & { password: string }) => api.post<ManagedUser>('/users', data).then((r) => r.data),
  update: (id: number, data: Partial<UserPayload>) => api.patch<ManagedUser>(`/users/${id}`, data).then((r) => r.data),
  resetPassword: (id: number, password: string) => api.post(`/users/${id}/reset-password`, { password }),
  remove: (id: number) => api.delete(`/users/${id}`),
}
