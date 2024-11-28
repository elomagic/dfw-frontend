import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from "react-router-dom";
import { Divider, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Info, Settings } from "@mui/icons-material";
import {GoLaw} from "react-icons/go";
import {TbDatabaseCog, TbLockCog} from "react-icons/tb";
import {RiUserSettingsLine} from "react-icons/ri";
import {AiOutlineDashboard} from "react-icons/ai";
import {FaShieldVirus} from "react-icons/fa";

export default function AppMenuItems() {

    const { t } = useTranslation();

    return (
        <React.Fragment>
            <ListItemButton component={RouterLink} to='/'>
                <ListItemIcon>
                    <AiOutlineDashboard className='fs15em'/>
                </ListItemIcon>
                <ListItemText primary={t('dashboard')}/>
            </ListItemButton>
            <ListItemButton component={RouterLink} to='license-issues'>
                <ListItemIcon>
                    <GoLaw className='fs15em'/>
                </ListItemIcon>
                <ListItemText primary={t("license-issues")}/>
            </ListItemButton>
                <ListItemButton component={RouterLink} to='vulnerabilities'>
                <ListItemIcon>
                    <FaShieldVirus className='fs15em'/>
                </ListItemIcon>
                <ListItemText primary={t("vulnerabilities")}/>
            </ListItemButton>

            <Divider sx={{my: 1}}/>

            <ListItemButton component={RouterLink} to='admin-licenses'>
                <ListItemIcon>
                    <Settings className='fs15em'/>
                </ListItemIcon>
                <ListItemText primary={t("admin-licenses")}/>
            </ListItemButton>

            <ListItemButton component={RouterLink} to='admin-vulnerabilities'>
                <ListItemIcon>
                    <Settings className='fs15em'/>
                </ListItemIcon>
                <ListItemText primary={t("admin-vulnerabilities")}/>
            </ListItemButton>

            <ListItemButton component={RouterLink} to='admin-repositories'>
                <ListItemIcon>
                    <TbDatabaseCog className='fs15em'/>
                </ListItemIcon>
                <ListItemText primary={t("admin-repositories")}/>
            </ListItemButton>

            <ListItemButton component={RouterLink} to='admin-credentials'>
                <ListItemIcon>
                    <TbLockCog className='fs15em'/>
                </ListItemIcon>
                <ListItemText primary={t("admin-credentials")}/>
            </ListItemButton>

            <Divider sx={{my: 1}}/>

            <ListItemButton component={RouterLink} to='admin-accounts'>
                <ListItemIcon>
                    <RiUserSettingsLine className='fs15em'/>
                </ListItemIcon>
                <ListItemText primary={t("user-accounts")}/>
            </ListItemButton>

            <Divider sx={{my: 1}}/>

            <ListItemButton component={RouterLink} to='about'>
                <ListItemIcon>
                    <Info className='fs15em'/>
                </ListItemIcon>
                <ListItemText primary={t("about")}/>
            </ListItemButton>
            {/*
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
            */}
        </React.Fragment>
    );
}