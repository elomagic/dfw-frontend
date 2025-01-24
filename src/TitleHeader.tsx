"use client"

import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {NavItem, getAllNavItems} from "./NavItems.ts";
import {Box, Stack} from "@mui/material";
import {ThemeSwitch} from "./components/ThemeSwitch.tsx";

const getNavItem = (path: string): NavItem | undefined => {

    const p = path.replace("/", "");
    return getAllNavItems().find((item) => { return item.url === p; });

}

export const TitleHeader = () => {
    const { t } = useTranslation();
    const [navItem, setNavItem] = useState<NavItem | undefined>(undefined);
    const location = useLocation();

    useEffect(() => {
        setNavItem(getNavItem(location.pathname));
    }, [location])

    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            {navItem && <navItem.icon style={{ height: "24", width: "24", fontSize: "24" }} />}
            <span>{t(navItem?.title ?? 'app.title')}</span>
            <Box flexGrow={1} />
            <ThemeSwitch />
        </Stack>
    );
}