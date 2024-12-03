import AdminSidebar from '@/components/navigation/AdminSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

export default function Layout({children}) {
  return (
    <SidebarProvider>
        <AdminSidebar />
        <main className='w-full'>
            <SidebarTrigger />
            {children}
        </main>
    </SidebarProvider>
  )
}
