import { Navigate, Outlet } from 'react-router'
import { useAuth } from '@/context/auth-context'

export function ProtectedRoute() {
  const { user, isLoading } = useAuth()
  if (isLoading) return <div className="grid h-screen place-items-center text-muted-foreground">Loading...</div>
  if (!user) return <Navigate to="/login" replace />
  return <Outlet />
}
