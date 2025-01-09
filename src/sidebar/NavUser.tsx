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
export function NavUser() {

    const { t } = useTranslation();
    const auth: AuthContextProps = useAuth();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>) => {
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
                    <ListItemAvatar>
                        <Avatar alt={auth.displayName} src={avatarUrl} />
                    </ListItemAvatar>
                    <ListItemText primary={auth.displayName} secondary={auth.mailAddress} />
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
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 48,
                                height: 48,
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
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <ListItem>
                    <ListItemAvatar>
                        <Avatar alt={auth.displayName} src={avatarUrl} />
                    </ListItemAvatar>
                    <ListItemText primary={auth.displayName} secondary={auth.mailAddress} />
                </ListItem>

                <Divider />

                <MenuItem component={RouterLink} to="my-account">
                    <ListItemIcon>
                        <RiUserSettingsLine fontSize="small" />
                    </ListItemIcon>
                    {t('my-account')}
                </MenuItem>

                <Divider />

                <MenuItem onClick={handleLogoutClick}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    {t('logout')}
                </MenuItem>
            </Menu>
        </>
    )
}