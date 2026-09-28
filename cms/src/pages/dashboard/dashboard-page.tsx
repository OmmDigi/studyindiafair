import { useAuth } from '@/context/auth-context'

export function DashboardPage() {
  const { user } = useAuth()
  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-muted-foreground">Welcome, {user?.name}</p>
    </div>
  )
}
