// "use client"
import * as React from "react"
import { Info, Settings, } from "lucide-react"
import {NavUser} from "../sidebar/NavUser.tsx";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "../components/ui/sidebar"
import {NavItemGroup} from "../sidebar/NavItemGroup.tsx";
import {TbDatabaseCog, TbLockCog} from "react-icons/tb";
import {GrConfigure} from "react-icons/gr";
import {RiUserSettingsLine} from "react-icons/ri";
import {AiOutlineDashboard} from "react-icons/ai";
import {BiSolidComponent} from "react-icons/bi";
import {GoLaw} from "react-icons/go";
import {FaShieldVirus} from "react-icons/fa";

const data = {
    navMain: {
        groupName: "main",
        items: [
        {
            name: "dashboard",
            url: "/",
            icon: AiOutlineDashboard,
        },
        {
            name: "components",
            url: "components",
            icon: BiSolidComponent,
        },
        {
            name: "license-issues",
            url: "license-issues",
            icon: GoLaw,
        },
        {
            name: "vulnerabilities",
            url: "vulnerabilities",
            icon: FaShieldVirus,
        },
    ]},
    navAdmin: {
        groupName: "administration",
        items: [
        {
            name: "admin-licenses",
            url: "admin-licenses",
            icon: Settings,
        },
        {
            name: "admin-vulnerabilities",
            url: "admin-vulnerabilities",
            icon: Settings,
        },
        {
            name: "admin-repositories",
            url: "admin-repositories",
            icon: TbDatabaseCog,
        },
        {
            name: "credentials",
            url: "admin-credentials",
            icon: TbLockCog,
        },
        {
            name: "configuration",
            url: "admin-configuration",
            icon: GrConfigure,
        },
        {
            name: "admin-accounts",
            url: "admin-accounts",
            icon: RiUserSettingsLine,
        },
    ]},
    navOther: {
        groupName: 'help',
        items: [
            {
                name: "about",
                url: "about",
                icon: Info,
            }
    ]},
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                Dependency Firewall
            </SidebarHeader>
            <SidebarContent>
                <NavItemGroup links={data.navMain} />
                <NavItemGroup links={data.navAdmin} />
                <NavItemGroup links={data.navOther} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
