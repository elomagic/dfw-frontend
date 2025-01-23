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
import {Configuration, Proxy} from "../../DTOs.ts";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../auth/useAuth.ts";
import CollapsableTableRow from "./CollapsableTableRow.tsx";
import CreateProxyDialog from "./CreateProxyDialog.tsx";
import {Role} from "../../auth/Auth.tsx";
import {toaster} from "../../Toaster.ts";
import {TableHeaderControls} from "../../components/TableHeaderControls.tsx";
import {YesNoDialog} from "../../components/YesNoDialog.tsx";

export const AdminProxiesView = () => {

    const { t } = useTranslation();
    const auth = useAuth();
    const [ rows, setRows ] = useState<Proxy[]>([]);
    const [ internalBaseUrl, setInternalBaseUrl ] = useState<string>("https://?");
    const [ filter, setFilter ] = useState<string>("");
    const [ dialogOpen, setDialogOpen ] = useState<boolean>(false);
    const [ deleteOpen, setDeleteOpen ] = useState<boolean>(false);
    const [ selectedEntity, setSelectedEntity ] = useState<Proxy>();

    const refresh = useCallback(() => {
        Rest.get<Proxy[]>(auth, Rest.Endpoint.Proxy)
            .then((reps: Proxy[]) => setRows(reps))
            .catch((err: Error) => {
                setRows([])
                toaster(t("getting-data-failed",  { message: err.message }), 'error');
            });
    }, [t, auth]);

    const handleCloseDialog = (dto: Proxy|undefined) => {
        setDialogOpen(false);
        refresh();

        if (dto) {
            setFilter(dto.name);
        }
    }

    const handleDeleteRequest = (r: Proxy) => {
        setSelectedEntity(r);
        setDeleteOpen(true);
    }

    const handleDelete = () => {
        Rest.deleteResource(auth, Rest.Endpoint.Proxy, selectedEntity?.id)
            .then(() => refresh())
            .catch((err: Error) => toaster(t("deleting-failed", { message: err.message }), 'error'))
            .finally(() => setDeleteOpen(false))
    }

    useEffect(() => refresh(), [refresh]);

    useEffect(() => {
        Rest.get<Configuration[]>(auth, Rest.Endpoint.Configuration)
            .then((entities: Configuration[]) => entities.filter((e) => e.key === "COMMON_BASE_URL")[0])
            .then((c: Configuration) => setInternalBaseUrl(c.value))
            .catch((err: Error) => {
                setRows([])
                toaster(t("getting-data-failed",  { message: err.message }), 'error');
            });
    }, [auth, t]);

    return (
        <Box margin={3}>
            <TableHeaderControls createCaption={t("create-proxy")}
                                 onCreateClicked={() => setDialogOpen(true)}
                                 onFilterChanged={f => setFilter(f)}
                                 onRefresh={refresh}
                                 role={Role.PROXY_CREATE}
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell width={"60px"}>{t("type")}</TableCell>
                            <TableCell>{t("name")}</TableCell>
                            <TableCell width={"60px"}>{t("enabled")}</TableCell>
                            <TableCell>{t("description")}</TableCell>
                            <TableCell>{t("external-url")}</TableCell>
                            <TableCell>{t("internal-url")}</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows
                            .filter(r => ("" === filter || r.name.toLowerCase().includes(filter.toLowerCase())))
                            .map((row) => (
                                <CollapsableTableRow key={row.name}
                                                     proxy={row}
                                                     internalBaseUrl={internalBaseUrl}
                                                     onDeleteRequest={(dto) => handleDeleteRequest(dto)}
                                />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <CreateProxyDialog open={dialogOpen} handleClose={(dto) => handleCloseDialog(dto)} />
            <YesNoDialog title={t("pages.admin-accounts.user.dialog.delete.title")}
                         text={t("pages.admin-proxies.dialog.delete.text", {name: selectedEntity?.name})}
                         open={deleteOpen}
                         onYesClick={() => handleDelete()}
                         onNoClick={() => setDeleteOpen(false)}
            />
        </Box>
    );
}
