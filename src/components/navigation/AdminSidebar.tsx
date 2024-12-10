import React from 'react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { LayoutDashboard, ShieldCheck } from 'lucide-react'
import { Label } from '../ui/label'
const locations = {
    analytics: [
        {
            title: "Dashboard",
            url: `${process.env.NEXT_PUBLIC_URL}/admin`,
            icon: LayoutDashboard
        }
    ],
    superadmin: [
        {
            title: "Approvals",
            url: `${process.env.NEXT_PUBLIC_URL}/admin/approvals`,
            icon: ShieldCheck
        }
    ]
}
export default function AdminSidebar() {
  return (
    <Sidebar>
        <SidebarHeader>
            <Label htmlFor='title' className='font-bold text-xl flex justify-center'>MeHeMo</Label>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Analytics</SidebarGroupLabel>
                <SidebarGroupContent>
                    {locations.analytics.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <a href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
                <SidebarGroupLabel>Super Admin</SidebarGroupLabel>
                <SidebarGroupContent>
                    {locations.superadmin.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <a href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    </Sidebar>
  )
}
