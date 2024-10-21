import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Link as RouterLink, useLocation} from "react-router-dom";
import {Button, Menu, MenuItem, Tab, Tabs, ListItemIcon} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {AddAPhoto, Info} from "@mui/icons-material";
import {MdOutlinePrivacyTip} from "react-icons/md";
import {FaBowlingBall, FaHome} from "react-icons/fa";
import {GiBowlingStrike} from "react-icons/gi";
import './TabBar.css';

export type PageMeta = {
    index: number,
    href: string;
    icon: string | React.ReactElement;
    textShortKey: string;
    role?: string;
    separator?: boolean;
}

export const PageMetas: PageMeta[] = [
    {
        index : 0,
        href: '/',
        icon: <FaHome/>,
        textShortKey: 'dashboard',
    }, {
        index : 1,
        href: 'game',
        icon: <FaBowlingBall/>,
        textShortKey: 'enter-game',
    }, {
        index : 2,
        href: 'scan-game',
        icon: <AddAPhoto/>,
        textShortKey: 'upload',
        role: 'IMAGE.SCAN',
    }, {
        index : 3,
        href: 'games',
        icon: <GiBowlingStrike/>,
        textShortKey: 'games',
    },
];


export default function TabBar() {

    const location = useLocation();
    const { t } = useTranslation();
    const [value, setValue] = React.useState(0);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);

    useEffect(() => {
        // Select current tab
        PageMetas
            .filter((m) => (location.pathname.startsWith("/" + m.href)))
            .forEach((m) => setValue(m.index));
    }, [location])

    const handleChange = (_event: React.SyntheticEvent, newIndex: number) => {
        setValue(newIndex);
    }

    const handleOpenMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <Tabs value={value} onChange={handleChange} className='TabBar'>
            {PageMetas.map((item) => (
                <Tab component={RouterLink}
                     to={item.href}
                     icon={item.icon}
                     label={t(item.textShortKey)}
                     key={item.href}
                     className="TabBar-Item"
                />
            ))}
            <Tab component={Button}
                 icon={<MenuIcon/>}
                 label={t('more')}
                 className="TabBar-Item"
                 onClick={handleOpenMenuClick}
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleCloseMenu}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem component={RouterLink} onClick={handleCloseMenu} to="dsgvo">
                    <ListItemIcon>
                        <MdOutlinePrivacyTip fontSize="small" />
                    </ListItemIcon>
                    {t('gdpr')}
                </MenuItem>
                {/* Prevent browser round trip */}
                <MenuItem component={RouterLink} onClick={handleCloseMenu} to="imprint">
                    <ListItemIcon>
                        <Info fontSize="small" />
                    </ListItemIcon>
                    {t('imprint')}
                </MenuItem>
            </Menu>
        </Tabs>
    )

}