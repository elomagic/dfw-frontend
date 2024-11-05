import {Box, Card, Paper} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {useTranslation} from "react-i18next";
import {useAuth} from "../../auth/useAuth.ts";
import {useEffect, useState} from "react";
import {Version} from "../../DTOs.ts";
import * as Rest from "../../RestClient.ts";
import {GitHub} from "@mui/icons-material";
import Link from "@mui/material/Link";

declare const __APP_VERSION__: string

export default function AboutView() {

    const { t } = useTranslation();
    const frontendVersion = __APP_VERSION__;
    const frontendBuildOn = "unknown";
    const auth = useAuth();
    const [ backendVersion, setBackendVersion ] = useState<string>("unknown");
    const [ backendBuildOn, setBackendBuildOn ] = useState<string>("unknown");

    useEffect(() => {
        Rest.get(auth, Rest.RestEndpoint.Version)
            .then((res) => res.json())
            .then((dto: Version) => {
                setBackendVersion(dto.version);
                setBackendBuildOn(dto.timestamp);
            })
            .catch((reason) => console.log(reason));
    }, [auth]);

    return (
        <Box margin={3}>
            <Card>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        Dependency Firewall
                    </Grid>
                    <Grid size={6}>
                        <Paper>
                            {t("backend")} v{backendVersion}<br/>
                            {t("builtOn")}: {backendBuildOn}<br/>
                            <GitHub/><Link href="https://github.com/elomagic/dfw-backend">GitHub</Link>
                        </Paper>
                    </Grid>
                    <Grid size={6}>
                        <Paper>
                            {t("frontend")} v{frontendVersion}<br/>
                            {t("builtOn")}: {frontendBuildOn}<br/>
                            <GitHub/><Link href="https://github.com/elomagic/dfw-frontend">GitHub</Link>
                        </Paper>
                    </Grid>
                    <Grid size={12}>
                        <Paper>
                            Licenses???
                        </Paper>
                    </Grid>
                    <Grid size={12}>
                        <Paper>Copyright Carsten Rambow. All Rights Reserved.</Paper>
                    </Grid>
                </Grid>

            </Card>
            AccountView
            {backendVersion}
            {frontendVersion}
            {t("abc")}
        </Box>
    );

}
