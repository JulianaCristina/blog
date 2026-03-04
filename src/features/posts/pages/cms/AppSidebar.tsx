import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { MENU_ITEMS } from '@/shared/routes.enum'
import { cn } from '@/lib/utils'
import { matchPath, NavLink, useLocation } from 'react-router'

export const AppSidebar = () => {
  const { pathname } = useLocation()

  return (
    <Sidebar>
      <SidebarHeader>
        <div>LOGO</div>
      </SidebarHeader>
      <SidebarContent>
        {MENU_ITEMS.map((item) => {
          const isActive = Boolean(
            matchPath({ path: item.to, end: item.to === '/cms/posts' }, pathname),
          )

          return (
            <SidebarMenuItem key={item.to}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                className={cn(
                  'justify-center rounded-none',
                  'data-[active=true]:bg-(--color-primary-dark)',
                  isActive ? cn('font-bold text-white') : 'opacity-80',
                )}
              >
                <NavLink to={item.to} end={item.to === '/cms/posts'}>
                  {item.label}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuItem key={'/logout'}>
          <SidebarMenuButton className="flex justify-center">
            <NavLink to={'/logout'}>Logout</NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  )
}
