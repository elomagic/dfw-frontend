"use client"

import type {IconType} from "react-icons";
import {useTranslation} from "react-i18next";
import {Link as RouterLink} from "react-router-dom";
import {Box, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip} from "@mui/material";
import {SvgIconComponent} from "@mui/icons-material";

export function NavItemGroup({ links, open }: Readonly<{
    links: {
        groupName: string;
        items: {
            name: string;
            url: string;
            icon: IconType | SvgIconComponent;
        }[]
    },
    open: boolean
}>) {

    const { t } = useTranslation();

    return (
        <>
            <Box sx={[{
                paddingLeft: "18px",
                fontSize: "0.75em",
                fontWeight: 600,
                color: "silver",
                textOverflow: "ellipse",
            },
                open ? {
                opacity: 1,
                } : {
                opacity: 0,
                    height: 0
                },
            ]}>
                {t(links.groupName)}
            </Box>
            <Box sx={{fontSize: "75%"}}>
                {links.items.map((item) => (
                    <ListItem key={item.url} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            component={RouterLink}
                            to={item.url}
                            sx={[
                                {
                                    minHeight: 48,
                                    px: 2.5,
                                },
                                open ? {
                                    justifyContent: 'initial',
                                } : {
                                    justifyContent: 'center',
                                },
                        ]}>
                            <ListItemIcon sx={[
                                {
                                    minWidth: 0,
                                    justifyContent: 'center',
                                },
                                open
                                    ? {
                                        mr: 1,
                                    } : {
                                        mr: 'auto',
                                    },
                            ]}>
                                <Tooltip title={t(item.name)}>
                                    <item.icon className='fs15em'/>
                                </Tooltip>
                            </ListItemIcon>
                            <ListItemText primary={(<span style={{fontSize: "0.90em"}}>{t(item.name)}</span>)}
                                          sx={[
                                              open
                                                  ? {
                                                      opacity: 1,
                                                  }
                                                  : {
                                                      opacity: 0,
                                                  },
                                          ]}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </Box>
            <Box sx={{height: "16px"}} />
        </>
    )
}