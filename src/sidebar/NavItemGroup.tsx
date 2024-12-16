"use client"

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../components/ui/sidebar"
import type {IconType} from "react-icons";
import {useTranslation} from "react-i18next";

export function NavItemGroup({ links }: Readonly<{
    links: {
        groupName: string;
        items: {
            name: string
            url: string
            icon: IconType
        }[]
    }
}>) {

    const { t } = useTranslation();

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>{t(links.groupName)}</SidebarGroupLabel>
            <SidebarMenu>
                {links.items.map((item) => (
                    <SidebarMenuItem key={t(item.name)}>
                        <SidebarMenuButton asChild>
                            <a href={item.url}>
                                <item.icon/>
                                <span>{t(item.name)}</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}