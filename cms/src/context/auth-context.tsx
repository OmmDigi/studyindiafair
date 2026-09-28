import { createContext, useContext, type ReactNode } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { PUBLIC_PATHS } from '@/lib/api'
import { authService } from '@/services/auth.service'
import type { Action, User } from '@/types/auth'

type AuthContextValue = {
  user: User | null
  isLoading: boolean
  isAdmin: boolean
  can: (action: Action) => boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  setUser: (user: User) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const qc = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: authService.me,
    retry: false,
    enabled: !PUBLIC_PATHS.includes(window.location.pathname),
  })

  const user = data ?? null

  const login = async (email: string, password: string) => {
    const { user } = await authService.login({ email, password })
    qc.setQueryData(['me'], user)
  }

  const logout = async () => {
    await authService.logout()
    qc.clear()
  }

  const setUser = (next: User) => qc.setQueryData(['me'], next)
  const can = (action: Action) => !!user?.permissions.includes(action)

  return (
    <AuthContext.Provider value={{ user, isLoading, isAdmin: user?.role === 'admin', can, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
