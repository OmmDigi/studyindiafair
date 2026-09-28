import { api } from '@/lib/api'
import type { User } from '@/types/auth'

export const authService = {
  login: (data: { email: string; password: string }) =>
    api.post<{ token: string; user: User; permissions: User['permissions'] }>('/auth/login', data).then((r) => ({
      ...r.data,
      user: { ...r.data.user, permissions: r.data.permissions },
    })),
  logout: () => api.post('/auth/logout'),
  me: () => api.get<User>('/auth/me').then((r) => r.data),
  updateProfile: (data: { name?: string; email?: string }) => api.patch<User>('/auth/me', data).then((r) => r.data),
  forgotPassword: (email: string) =>
    api.post<{ message: string }>('/auth/forgot-password', { email }).then((r) => r.data),
  resetPassword: (data: { email: string; otp: string; password: string }) =>
    api.post<{ message: string }>('/auth/reset-password', data).then((r) => r.data),
}
