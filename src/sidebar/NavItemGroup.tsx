"use client"

import type {IconType} from "react-icons";
import {useTranslation} from "react-i18next";
import {Link as RouterLink} from "react-router-dom";
import {Box, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {SvgIconComponent} from "@mui/icons-material";

export function NavItemGroup({ links }: Readonly<{
    links: {
        groupName: string;
        items: {
            name: string;
            url: string;
            icon: IconType | SvgIconComponent;
        }[]
    }
}>) {

    const { t } = useTranslation();

    return (
        <>
            <Box sx={{paddingLeft: "18px", fontSize: "0.75em", fontWeight: 600, color: "silver", textOverflow: "ellipse" }}>{t(links.groupName)}</Box>
            <Box sx={{fontSize: "75%"}}>
                {links.items.map((item) => (
                    <ListItemButton component={RouterLink} to={item.url} key={item.url} sx={{paddingTop: "4px"}}>
                        <ListItemIcon sx={{minWidth: 32}}>
                            <item.icon className='fs15em'/>
                        </ListItemIcon>
                        <ListItemText primary={(<span style={{fontSize: "0.90em"}}>{t(item.name)}</span>)} />
                    </ListItemButton>
                ))}
            </Box>
            <Box sx={{height: "16px"}} />
        </>
    )
}