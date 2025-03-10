"use client"

import {ReactNode, SyntheticEvent, useState} from "react";
import {useTranslation} from "react-i18next";
import {Box, Tab, Tabs} from "@mui/material";
import {PurlMapTab} from "./purlMap/PurlMapTab.tsx";
import {NameMapTab} from "./nameMap/NameMapTab.tsx";

interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

const CustomTabPanel = (props: Readonly<TabPanelProps>) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`admin-licenses-tab-${index}`}
            aria-labelledby={`admin-licenses-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
        </div>
    );
}

const a11yProps = (index: number) => {
    return {
        id: `admin-licenses-tab-${index}`,
        'aria-controls': `admin-licenses-tab-${index}`,
    };
}

export const AdminPatchesView = () => {

    const { t } = useTranslation();
    const [value, setValue] = useState(0);

    const handleChange = (_event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box margin={3}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label={t("purl-mappings")} {...a11yProps(0)} />
                    <Tab label={t("name-mappings")} {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <PurlMapTab/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <NameMapTab/>
            </CustomTabPanel>
        </Box>
    );
}
