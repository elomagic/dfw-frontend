import * as React from "react";
import {useState} from "react";
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from "react-router-dom";
import {Button, Menu, MenuItem,} from "@mui/material";
import {AccountCircle, Logout} from "@mui/icons-material";
import ListItemIcon from "@mui/material/ListItemIcon";
import {useAuth} from "./Auth.ts";

export default function UserSessionButton() {
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);
    const [auth] = useAuth();

    const handleOpenMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogoutClick = () => {
        setAnchorEl(null);
        auth.signoutRedirect()
            .catch((e) => console.log(e.message));
    }

    return (
        <div>
            <Button
                id="basic-button"
                color="inherit"
                variant="text"
                style={{textTransform: "none"}}
                className="tt-none"
                aria-controls={menuOpen ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={menuOpen ? 'true' : undefined}
                endIcon={<AccountCircle />}
                onClick={handleOpenMenuClick}
            >
                {auth.mailAddress}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleCloseMenu}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem component={RouterLink} onClick={handleCloseMenu} to="my-profile">
                    <ListItemIcon>
                        <AccountCircle fontSize="small" />
                    </ListItemIcon>
                    {t('my-account')}
                </MenuItem>
                {/* Prevent browser round trip */}
                <MenuItem onClick={handleLogoutClick}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    {t('logout')}
                </MenuItem>
            </Menu>
        </div>
    );
}