"use client"

import {Box, Card, Divider, Stack, Typography} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {useTranslation} from "react-i18next";
import {useAuth} from "../../auth/useAuth.ts";
import {useEffect, useState} from "react";
import {Version} from "../../DTOs.ts";
import * as Rest from "../../RestClient.ts";
import {GitHub} from "@mui/icons-material";
import Link from "@mui/material/Link";

declare const __APP_VERSION__: string

export const AboutView = () => {

    const { t } = useTranslation();
    const frontendVersion = __APP_VERSION__;
    const frontendBuildOn = "unknown";
    const auth = useAuth();
    const [ backend, setBackend ] = useState<Version|undefined>(undefined);

    useEffect(() => {
        Rest.get<Version>(auth, Rest.Endpoint.Version)
            .then((dto: Version) => setBackend(dto))
            .catch((reason) => console.log(reason));
    }, [auth]);

    return (
        <Box margin={4} sx={{ display: "flex", flexDirection: "column" }}>
            <Card sx={{ minWidth: "600px", alignSelf: "center", padding: "10px", fontSize: "smaller" }}>

                <Stack direction="row" gap={1} alignItems={"center"}>
                    <img width="32px" src="/fav-icon.svg" alt="logo" />
                    <Typography component="div" variant="h6">{t("app.title")}</Typography>
                </Stack>

                <Divider sx={{ mt: 2, mb: 2 }} />

                <Grid container spacing={2}>
                    {/* Left column */}
                    <Grid size={6}>
                        <span style={{color: 'gray'}}>{t("backend")}:</span> v{backend?.version ?? t("unknown")}<br/>
                        <span style={{color: 'gray'}}>{t("builtOn")}:</span> {backend?.timestamp ?? t("unknown")}
                        <Stack direction="row" spacing={1}>
                            <GitHub fontSize="small"/><Link href="https://github.com/elomagic/dfw-backend">GitHub</Link>
                        </Stack>
                        <br/>
                        <span style={{color: 'gray'}}>{t("database-product")}:</span> {backend?.databaseProduct ?? t("unknown")}<br/>
                        <span style={{color: 'gray'}}>{t("database-version")}:</span> {backend?.databaseVersion ?? t("unknown")}<br/>
                        <span style={{color: 'gray'}}>{t("database-schema")}:</span> {backend?.databaseSchemaId ?? t("unknown")}<br/>
                    </Grid>

                    {/* Right column */}
                    <Grid size={6}>
                        <span style={{color: 'gray'}}>{t("frontend")}:</span> v{frontendVersion}<br/>
                        <span style={{color: 'gray'}}>{t("builtOn")}:</span> {frontendBuildOn}<br/>
                        <Stack direction="row" spacing={1}>
                            <GitHub fontSize="small"/><Link
                            href="https://github.com/elomagic/dfw-frontend">GitHub</Link>
                        </Stack>
                    </Grid>
                </Grid>

                <Divider sx={{ mt: 2, mb: 2 }} />

                <Typography component="div" variant="subtitle2">
                    Copyright &copy; Carsten Rambow. All Rights Reserved.
                </Typography>
            </Card>
        </Box>
    );

}
