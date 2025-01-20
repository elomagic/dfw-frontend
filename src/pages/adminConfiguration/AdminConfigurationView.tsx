"use client"

import {Box, Paper} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useCallback, useEffect, useState} from "react";
import * as Rest from "../../RestClient.ts"
import {Configuration, ConfigurationKeyMeta} from "../../DTOs.ts";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../auth/useAuth.ts";
import TableHeaderControls from "../../components/TableHeaderControls.tsx";
import CollapsableTableRow from "./CollapsableTableRow.tsx";
import YesNoDialog from "../../components/YesNoDialog.tsx";
import { toaster } from "../../Toaster.ts";

export default function AdminConfigurationView() {

    const { t } = useTranslation();
    const auth = useAuth();
    const [ rows, setRows ] = useState<Configuration[]>([]);
    const [ filter, setFilter ] = useState<string>("");
    const [ deleteOpen, setDeleteOpen ] = useState<boolean>(false);
    const [ selectedEntity, setSelectedEntity ] = useState<Configuration>();

    const [ configurationKeyMetas, setConfigurationKeyMetas ] = useState<ConfigurationKeyMeta[]>([]);

    const refresh = useCallback(() => {
        Rest.get<Configuration[]>(auth, Rest.RestEndpoint.Configuration)
            .then((entities: Configuration[]) => {
                return entities.sort((a, b) => a.key.localeCompare(b.key));
            })
            .then((entities: Configuration[]) => {
                setRows(entities);
            })
            .catch((err: Error) => {
                setRows([])
                toaster(t("getting-data-failed",  { message: err.message }), 'error');
            });
    }, [t, auth]);

    const handleResetRequest = (r: Configuration) => {
        setSelectedEntity(r);
        setDeleteOpen(true);
    }

    const handleDelete = () => {
        Rest.deleteResource(auth, Rest.RestEndpoint.Configuration, selectedEntity?.key)
            .then(() => refresh())
            .catch((err: Error) => toaster(t("reset-failed", { message: err.message }), 'error'))
            .finally(() => setDeleteOpen(false))
    }

    useEffect(() => refresh(), [refresh]);

    useEffect(() => {
        Rest.get<ConfigurationKeyMeta[]>(auth, Rest.RestEndpoint.ConfigurationKey)
            .then((rs: ConfigurationKeyMeta[]) => setConfigurationKeyMetas(rs))
            .catch((err: Error) => toaster(t("getting-data-failed",  { message: err.message }), 'error'));
    }, [auth, t]);

    return (
        <Box margin={3}>
            <TableHeaderControls onFilterChanged={f => setFilter(f)} onRefresh={refresh}/>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell width={"500px"}>{t("property")}</TableCell>
                            <TableCell>{t("value")}</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows
                            .filter(dto => ("" === filter || dto.key.toLowerCase().includes(filter.toLowerCase())))
                            .map((row) => (
                                <CollapsableTableRow key={row.key}
                                                     configuration={row}
                                                     keyMeta={configurationKeyMetas.find(m => m.key == row.key)}
                                                     onResetRequest={(c) => handleResetRequest(c)}
                                />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <YesNoDialog title={t("pages.admin-configuration.dialog.reset.title")}
                         text={t("pages.admin-configuration.dialog.reset.text", {key: selectedEntity?.key})}
                         open={deleteOpen}
                         onYesClick={() => handleDelete()}
                         onNoClick={() => setDeleteOpen(false)}
            />
        </Box>
    );
}
