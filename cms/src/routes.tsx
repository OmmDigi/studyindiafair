import { createBrowserRouter } from 'react-router'
import { ProtectedRoute } from '@/components/protected-route'
import { AdminLayout } from '@/layouts/admin-layout'
import { LoginPage } from '@/pages/auth/login-page'
import { DashboardPage } from '@/pages/dashboard/dashboard-page'

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [{ index: true, element: <DashboardPage /> }],
      },
    ],
  },
])
