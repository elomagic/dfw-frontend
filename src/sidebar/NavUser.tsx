"use client"

import {AuthContextProps} from "../auth/Auth.tsx";
import {useAuth} from "../auth/useAuth.ts";
import {useTranslation} from "react-i18next";
import {Link as RouterLink} from "react-router-dom";
import {RiUserSettingsLine} from "react-icons/ri";
import {
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem
} from "@mui/material";
import {Logout} from "@mui/icons-material";
import {useState} from "react";
import * as React from "react";
import {BsChevronExpand} from "react-icons/bs";
export function NavUser({ expand }: Readonly<{ expand: boolean }>) {

    const { t } = useTranslation();
    const auth: AuthContextProps = useAuth();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // todo
    const avatarUrl = undefined;

    const handleLogoutClick = () => {
        auth.signoutRedirect()
            .catch((e) => console.log(e.message));
    }

    return (
        <>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem onClick={handleClick}>
                    <ListItemAvatar sx={{ minWidth: "40px" }}>
                        <Avatar alt={auth.displayName} src={avatarUrl} sx={{ width: 32, height: 32 }} variant="rounded" />
                    </ListItemAvatar>

                    <ListItemText
                        primary={<span style={{fontSize: "smaller", fontWeight: "bolder"}}>{auth.displayName}</span>}
                        secondary={<span style={{fontSize: "smaller"}}>{auth.mailAddress}</span>}
                        sx={[
                            {
                                transition: "opacity 0.5s",
                            },
                            expand
                                ? {
                                    opacity: 1,
                                }
                                : {
                                    opacity: 0,
                                },
                        ]}
                    />

                    <BsChevronExpand />
                </ListItem>
            </List>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            border: "1px solid #2F2F2F",
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'center' }}
            >
                <ListItem sx={{ paddingTop: 0 }}>
                    <ListItemAvatar sx={{ minWidth: "30px" }}>
                        <Avatar alt={auth.displayName} src={avatarUrl} variant="rounded" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={<span style={{ fontSize: "smaller", fontWeight: "bolder" }}>{auth.displayName}</span>}
                        secondary={<span style={{ fontSize: "smaller" }}>{auth.mailAddress}</span>}
                    />
                </ListItem>

                <Divider sx={{ mb: 1 }}/>

                <MenuItem component={RouterLink} to="my-account" sx={{fontSize: "0.90em"}}>
                    <ListItemIcon>
                        <RiUserSettingsLine className='fs15em'/>
                    </ListItemIcon>
                    {t('my-account')}
                </MenuItem>

                <MenuItem onClick={handleLogoutClick} sx={{fontSize: "0.90em"}}>
                    <ListItemIcon>
                        <Logout className='fs15em' />
                    </ListItemIcon>
                    {t('logout')}
                </MenuItem>
            </Menu>
        </>
    )
}