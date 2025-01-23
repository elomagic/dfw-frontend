"use client"

import {NavItemGroup} from "./NavItemGroup.tsx";
import {List} from "@mui/material";
import {NavUser} from "./NavUser.tsx";
import {NavItemData} from "../NavItems.ts";

export const AppMenuItems = ({ open }: Readonly<{ open: boolean }>) => {

    return (
        <List>
            <NavItemGroup links={NavItemData.navMain} open={open}/>
            <NavItemGroup links={NavItemData.navAdmin} open={open} />
            <NavItemGroup links={NavItemData.navHelp} open={open} />

            <NavUser expand={open}/>
        </List>
    );

}