import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from "react-router-dom";
import { Divider, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import {LocalPolice, BugReport, Home, Info, Public, Settings, Group} from "@mui/icons-material";
import {GoLaw} from "react-icons/go";

export default function AppMenuItems() {

    const { t } = useTranslation();

    return (
        <React.Fragment>
            <ListItemButton component={RouterLink} to='/'>
                <ListItemIcon>
                    <Home className='fs15em'/>
                </ListItemIcon>
                <ListItemText primary={t('dashboard')}/>
            </ListItemButton>
            <ListItemButton component={RouterLink} to='licenses'>
                <ListItemIcon>
                    <GoLaw className='fs15em'/>
                </ListItemIcon>
                <ListItemText primary={t("licenses")}/>
            </ListItemButton>
            <ListItemButton component={RouterLink} to='vulnerabitlites'>
                <ListItemIcon>
                    <BugReport className='fs15em'/>
                </ListItemIcon>
                <ListItemText primary={t("vulnerabilities")}/>
            </ListItemButton>

            <Divider sx={{my: 1}}/>

            <ListItemButton component={RouterLink} to='admin-licenses'>
                <ListItemIcon>
                    <Settings className='fs15em'/>
                </ListItemIcon>
                <ListItemText primary={t("licenses")}/>
            </ListItemButton>

            <ListItemButton component={RouterLink} to='admin-vulnerabilities'>
                <ListItemIcon>
                    <Settings className='fs15em'/>
                </ListItemIcon>
                <ListItemText primary={t("vulnerabilities")}/>
            </ListItemButton>

            <ListItemButton component={RouterLink} to='admin-repositories'>
                <ListItemIcon>
                    <Public className='fs15em'/>
                </ListItemIcon>
                <ListItemText primary={t("repositories")}/>
            </ListItemButton>

            <Divider sx={{my: 1}}/>

            <ListItemButton component={RouterLink} to='admin-accounts'>
                <ListItemIcon>
                    <Group className='fs15em'/>
                </ListItemIcon>
                <ListItemText primary={t("user-accounts")}/>
            </ListItemButton>

            <Divider sx={{my: 1}}/>

            <ListItemButton component={RouterLink} to='dsgvo'>
                <ListItemIcon>
                    <LocalPolice className='fs15em'/>
                </ListItemIcon>
                <ListItemText primary={t("gdpr")}/>
            </ListItemButton>
            <ListItemButton component={RouterLink} to='imprint'>
                <ListItemIcon>
                    <Info className='fs15em'/>
                </ListItemIcon>
                <ListItemText primary={t("imprint")}/>
            </ListItemButton>
        </React.Fragment>
    );
}