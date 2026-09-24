import { createBrowserRouter } from 'react-router'
import { AdminRoute } from '@/components/admin-route'
import { ProtectedRoute } from '@/components/protected-route'
import { AdminLayout } from '@/layouts/admin-layout'
import { ForgotPasswordPage } from '@/pages/auth/forgot-password-page'
import { LoginPage } from '@/pages/auth/login-page'
import { DashboardPage } from '@/pages/dashboard/dashboard-page'
import { FaqsPage } from '@/pages/faqs/faqs-page'
import { GalleryPage } from '@/pages/gallery/gallery-page'
import { GalleryCategoriesPage } from '@/pages/gallery-categories/gallery-categories-page'
import { ProfilePage } from '@/pages/profile/profile-page'
import { SiteSettingsPage } from '@/pages/site-settings/site-settings-page'
import { TeamMembersPage } from '@/pages/team-members/team-members-page'
import { TestimonialCategoriesPage } from '@/pages/testimonial-categories/testimonial-categories-page'
import { TestimonialsPage } from '@/pages/testimonials/testimonials-page'
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
          { path: 'testimonials', element: <TestimonialsPage /> },
          { path: 'testimonial-categories', element: <TestimonialCategoriesPage /> },
          { path: 'faqs', element: <FaqsPage /> },
          { path: 'team-members', element: <TeamMembersPage /> },
          { path: 'gallery', element: <GalleryPage /> },
          { path: 'gallery-categories', element: <GalleryCategoriesPage /> },
          { path: 'site-settings', element: <SiteSettingsPage /> },
          {
            element: <AdminRoute />,
            children: [{ path: 'users', element: <UsersPage /> }],
          },
        ],
      },
    ],
  },
])
