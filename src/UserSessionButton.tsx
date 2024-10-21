import * as React from "react";
import {useState} from "react";
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from "react-router-dom";
import {Button, Menu, MenuItem,} from "@mui/material";
import {AccountCircle, Login, Logout} from "@mui/icons-material";
import ListItemIcon from "@mui/material/ListItemIcon";
import {logout, signinRedirect} from "./aas.ts";

export default function UserSessionButton() {
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);
    //  TODO
    const [authenticated] = useState<boolean>(true);

    const handleOpenMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogoutClick = () => {
        setAnchorEl(null);
        logout();
            // .catch((e: any) => console.log(e.message));
    }

    return (
        <React.Fragment>
            {!authenticated &&
                <div>
                    <Button
                        color="inherit"
                        variant="text"
                        endIcon={<Login />}
                        onClick={() => signinRedirect()}
                    >
                        {t('login')}
                    </Button>
                </div>
            }
            {authenticated &&
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
                        USER {/* TODO auth.user?.profile.name*/}
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
            }
        </React.Fragment>
    );
}