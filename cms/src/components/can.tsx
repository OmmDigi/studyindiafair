import type { ReactNode } from 'react'
import { useAuth } from '@/context/auth-context'
import type { Action } from '@/types/auth'

export function Can({ action, children }: { action: Action; children: ReactNode }) {
  const { can } = useAuth()
  return can(action) ? children : null
}
