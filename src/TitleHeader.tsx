import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {NavItemData} from "./NavItems.ts";
import type {IconType} from "react-icons";
import {SvgIconComponent} from "@mui/icons-material";

declare type PathTitle = {
    url: string,
    title: string,
    icon: IconType | SvgIconComponent;
}

const getAllPathsTitle = (): PathTitle[] => {

    const items: PathTitle[] = [];

    NavItemData.navMain.items.forEach((item) => { items.push(item); });
    NavItemData.navAdmin.items.forEach((item) => { items.push(item); });
    NavItemData.navHelp.items.forEach((item) => { items.push(item); });
    NavItemData.navOther.items.forEach((item) => { items.push(item); });

    return items;
}

const getNavItem = (path: string): PathTitle | undefined => {

    const p = path.replace("/", "");
    return getAllPathsTitle().find((item) => { return item.url === p; });

}

export default function TitleHeader() {
    const { t } = useTranslation();
    const [navItem, setNavItem] = useState<PathTitle | undefined>(undefined);
    const location = useLocation();

    useEffect(() => {
        setNavItem(getNavItem(location.pathname));
    }, [location])

    return (
        <div style={{display: "flex", alignItems: "center"}}>
            {navItem && <navItem.icon style={{ height: "24", width: "24", fontSize: "24" }} />}
            <span style={{ paddingLeft: 8 }}>{t(navItem?.title ?? 'app.title')}</span>
        </div>
    );
}