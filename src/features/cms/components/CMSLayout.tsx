import { Outlet } from 'react-router'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/features/cms/components/AppSidebar'

export const CMSLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <div className="p-4">
            <SidebarTrigger />
          </div>

          <div className="px-6 pb-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
