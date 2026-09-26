import { CircleHelp, ClipboardList, Mail, FileText, FolderTree, Images, LayoutDashboard, LogOut, MessageSquareQuote, SearchCheck, Settings, Tags, UserCircle, Users, UsersRound, type LucideIcon } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router'
import { useAuth } from '@/context/auth-context'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

type NavItem = { title: string; url: string; icon: LucideIcon; adminOnly?: boolean }

const navGroups: { label?: string; items: NavItem[] }[] = [
  {
    items: [{ title: 'Dashboard', url: '/', icon: LayoutDashboard }],
  },
  {
    label: 'Content',
    items: [
      { title: 'Pages', url: '/pages', icon: FileText },
      { title: 'SEO', url: '/seo', icon: SearchCheck },
      { title: 'FAQs', url: '/faqs', icon: CircleHelp },
      { title: 'Team Members', url: '/team-members', icon: UsersRound },
    ],
  },
  {
    label: 'Testimonials',
    items: [
      { title: 'Testimonials', url: '/testimonials', icon: MessageSquareQuote },
      { title: 'Categories', url: '/testimonial-categories', icon: Tags },
    ],
  },
  {
    label: 'Gallery',
    items: [
      { title: 'Gallery', url: '/gallery', icon: Images },
      { title: 'Categories', url: '/gallery-categories', icon: FolderTree },
    ],
  },
  {
    label: 'Forms & Emails',
    items: [
      { title: 'Forms', url: '/forms', icon: ClipboardList },
      { title: 'Email Templates', url: '/email-templates', icon: Mail },
    ],
  },
  {
    label: 'Settings',
    items: [
      { title: 'Site Settings', url: '/site-settings', icon: Settings },
      { title: 'Users', url: '/users', icon: Users, adminOnly: true },
    ],
  },
]


export function AppSidebar() {
  const { user, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-3 text-lg font-semibold">Study India Fair</SidebarHeader>
      <SidebarContent>
        {navGroups.map((group) => {
          const items = group.items.filter((item) => !item.adminOnly || isAdmin)
          if (items.length === 0) return null
          return (
            <SidebarGroup key={group.label ?? 'main'}>
              {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <NavItemLink key={item.url} item={item} />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )
        })}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <NavItemLink item={{ title: 'Profile', url: '/profile', icon: UserCircle }} />
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <LogOut />
              <span>Logout ({user?.name})</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

function NavItemLink({ item }: { item: NavItem }) {
  return (
    <SidebarMenuItem>
      <NavLink to={item.url} end={item.url === '/'}>
        {({ isActive }) => (
          <SidebarMenuButton isActive={isActive}>
            <item.icon />
            <span>{item.title}</span>
          </SidebarMenuButton>
        )}
      </NavLink>
    </SidebarMenuItem>
  )
}
