import { Navigate, Outlet } from 'react-router'
import { useAuth } from '@/context/auth-context'

export function AdminRoute() {
  const { isAdmin } = useAuth()
  return isAdmin ? <Outlet /> : <Navigate to="/" replace />
}
