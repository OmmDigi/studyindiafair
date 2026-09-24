import { createBrowserRouter } from 'react-router'
import { AdminRoute } from '@/components/admin-route'
import { ProtectedRoute } from '@/components/protected-route'
import { AdminLayout } from '@/layouts/admin-layout'
import { ForgotPasswordPage } from '@/pages/auth/forgot-password-page'
import { LoginPage } from '@/pages/auth/login-page'
import { DashboardPage } from '@/pages/dashboard/dashboard-page'
import { ProfilePage } from '@/pages/profile/profile-page'
import { UsersPage } from '@/pages/users/users-page'

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'profile', element: <ProfilePage /> },
          {
            element: <AdminRoute />,
            children: [{ path: 'users', element: <UsersPage /> }],
          },
        ],
      },
    ],
  },
])
