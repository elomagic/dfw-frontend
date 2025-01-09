"use client"

import {Info, Settings} from "@mui/icons-material";
import {GoLaw} from "react-icons/go";
import {TbDatabaseCog, TbLockCog} from "react-icons/tb";
import {RiUserSettingsLine} from "react-icons/ri";
import {AiOutlineDashboard} from "react-icons/ai";
import {FaShieldVirus} from "react-icons/fa";
import {GrConfigure} from "react-icons/gr";
import {BiSolidComponent} from "react-icons/bi";
import {NavItemGroup} from "./NavItemGroup.tsx";
import {MdPolicy} from "react-icons/md";
import {List} from "@mui/material";
import {NavUser} from "./NavUser.tsx";

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
                name: "policies",
                url: "admin-policies",
                icon: MdPolicy,
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

export default function AppMenuItems({ open }: Readonly<{ open: boolean }>) {

    return (
        <List>
            <NavItemGroup links={data.navMain} open={open}/>
            <NavItemGroup links={data.navAdmin} open={open} />
            <NavItemGroup links={data.navOther} open={open} />

            <NavUser />
        </List>
    );

}