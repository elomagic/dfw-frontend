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
                tooltip: "dashboard",
                url: "/",
                icon: AiOutlineDashboard,
            },
            {
                name: "components",
                tooltip: "components",
                url: "components",
                icon: BiSolidComponent,
            },
            {
                name: "license-issues",
                tooltip: "license-issues",
                url: "license-issues",
                icon: GoLaw,
            },
            {
                name: "vulnerabilities",
                tooltip: "vulnerabilities",
                url: "vulnerabilities",
                icon: FaShieldVirus,
            },
        ]},
    navAdmin: {
        groupName: "administration",
        items: [
            {
                name: "licenses",
                tooltip: "admin-licenses",
                url: "admin-licenses",
                icon: Settings,
            },
            {
                name: "vulnerabilities",
                tooltip: "admin-vulnerabilities",
                url: "admin-vulnerabilities",
                icon: Settings,
            },
            {
                name: "repositories",
                tooltip: "admin-repositories",
                url: "admin-repositories",
                icon: TbDatabaseCog,
            },
            {
                name: "policies",
                tooltip: "policies",
                url: "admin-policies",
                icon: MdPolicy,
            },
            {
                name: "credentials",
                tooltip: "credentials",
                url: "admin-credentials",
                icon: TbLockCog,
            },
            {
                name: "configuration",
                tooltip: "configuration",
                url: "admin-configuration",
                icon: GrConfigure,
            },
            {
                name: "accounts",
                tooltip: "admin-accounts",
                url: "admin-accounts",
                icon: RiUserSettingsLine,
            },
        ]},
    navOther: {
        groupName: 'help',
        items: [
            {
                name: "about",
                tooltip: "about",
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

            <NavUser expand={open}/>
        </List>
    );

}