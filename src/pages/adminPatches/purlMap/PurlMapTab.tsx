"use client"

import {useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Box, Paper} from "@mui/material";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {useAuth} from "@/auth/useAuth.ts";
import * as Rest from "../../../RestClient.ts";
import {Role} from "@/auth/Role.ts";
import {toaster} from "@/Toaster.ts";
import {TableHeaderControls} from "@components/TableHeaderControls.tsx";
import {YesNoDialog} from "@components/YesNoDialog.tsx";
import {LicensePurlMap} from "@/DTOs.ts";
import {CollapsableTableRow} from "./CollapsableTableRow.tsx";
import {CreatePurlMapDialog} from "./CreatePurlMapDialog.tsx";

export const PurlMapTab = () => {

    const { t } = useTranslation();
    const auth = useAuth();
    const [ rows, setRows ] = useState<LicensePurlMap[]>([]);
    const [ filter, setFilter ] = useState<string>("");
    const [ dialogOpen, setDialogOpen ] = useState<boolean>(false);
    const [ deleteOpen, setDeleteOpen ] = useState<boolean>(false);
    const [ selectedEntity, setSelectedEntity ] = useState<LicensePurlMap>();

    const refresh = useCallback(() => {
        Rest.get<LicensePurlMap[]>(auth, Rest.Endpoint.LicensePurlMap)
            .then((dtos: LicensePurlMap[]) => setRows(dtos))
            .catch((err: Error) => {
                setRows([])
                toaster(t("getting-data-failed",  { message: err.message }), 'error');
            });
    }, [t, auth]);

    const handleCloseDialog = (dto: LicensePurlMap|undefined) => {
        setDialogOpen(false);
        refresh();

        if (dto) {
            setFilter(dto.purlMatch);
        }

    }

    const handleDeleteRequest = (pm: LicensePurlMap) => {
        setSelectedEntity(pm);
        setDeleteOpen(true);
    }

    const handleDelete = () => {
        Rest.deleteResource(auth, Rest.Endpoint.LicensePurlMap, selectedEntity?.id)
            .then(() => refresh())
            .catch((err: Error) => toaster(t("deleting-failed", { message: err.message }), 'error'))
            .finally(() => setDeleteOpen(false))
    }

    useEffect(() => refresh(), [refresh]);

    return (
        <Box>
            <TableHeaderControls createCaption={t("create-purl-mapping")}
                                 onCreateClicked={() => setDialogOpen(true)}
                                 onFilterChanged={f => setFilter(f)}
                                 onRefresh={refresh}
                                 role={Role.LICENSE_PURL_MAP_CREATE}
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell width={"50%"}>{t("purl-match")}</TableCell>
                            <TableCell width={"50%"}>{t("spdx-id")}</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows
                            .filter(r => ("" === filter || r.purlMatch.toLowerCase().includes(filter.toLowerCase())))
                            .map(row => (
                                <CollapsableTableRow key={row.id}
                                                     purlMap={row}
                                                     onDeleteRequest={(id) => handleDeleteRequest(id)}
                                />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <CreatePurlMapDialog open={dialogOpen} handleClose={(dto) => handleCloseDialog(dto)} />
            <YesNoDialog title={t("delete-purl-mapping")}
                         text={`Do ya really want to delete the PURL match '${selectedEntity?.purlMatch}'?`}
                         open={deleteOpen}
                         onYesClick={() => handleDelete()}
                         onNoClick={() => setDeleteOpen(false)}
            />
        </Box>
    );
}