import {useTranslation} from "react-i18next";
import {useAuth} from "../../auth/useAuth.ts";
import {useEffect, useState} from "react";
import {Version} from "../../DTOs.ts";
import * as Rest from "../../RestClient.ts";
import {Grid, GridItem} from "../../components/Grids.tsx";
import {FaGithub} from "react-icons/fa";

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
        <div style={{ margin: 4, display: "flex", flexDirection: "column" }}>
            <div style={{ maxWidth: "800px", alignSelf: "center" }}>
                <Grid>
                    <GridItem size={12}>
                        {t("app.title")}
                    </GridItem>
                    <GridItem size={6}>
                        {t("backend")} v{backendVersion}<br/>
                        {t("builtOn")}: {backendBuildOn}
                        <div>
                            <FaGithub size="small"/> <a href="https://github.com/elomagic/dfw-backend">GitHub</a>
                        </div>
                    </GridItem>
                    <GridItem size={6}>
                        {t("frontend")} v{frontendVersion}<br/>
                        {t("builtOn")}: {frontendBuildOn}<br/>
                        <div>
                            <FaGithub size="small"/> <a href="https://github.com/elomagic/dfw-frontend">GitHub</a>
                        </div>
                    </GridItem>
                    <GridItem size={12}>
                        Licenses???
                    </GridItem>
                    <GridItem size={12}>
                        Copyright Carsten Rambow. All Rights Reserved.
                    </GridItem>
                </Grid>
            </div>
        </div>
    );

}
