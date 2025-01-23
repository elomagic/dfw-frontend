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
import {LicenseGroup, Policy} from "../../DTOs.ts";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../auth/useAuth.ts";
import {Role} from "../../auth/Auth.tsx";
import {toaster} from "../../Toaster.ts";
import { TableHeaderControls } from "../../components/TableHeaderControls.tsx";
import { YesNoDialog } from "../../components/YesNoDialog.tsx";
import {CollapsableTableRow} from "./CollapsableTableRow.tsx";
import {CreatePolicyDialog} from "./CreatePolicyDialog.tsx";

export const AdminPolicyView = () => {

    const { t } = useTranslation();
    const auth = useAuth();
    const [ rows, setRows ] = useState<Policy[]>([]);
    const [ filter, setFilter ] = useState<string>("");
    const [ dialogOpen, setDialogOpen ] = useState<boolean>(false);
    const [ deleteOpen, setDeleteOpen ] = useState<boolean>(false);
    const [ selectedEntity, setSelectedEntity ] = useState<Policy>();
    const [ licenseGroups, setLicenseGroups ] = useState<LicenseGroup[]>([]);

    const refresh = useCallback(() => {
        Rest.get<Policy[]>(auth, Rest.Endpoint.Policy)
            .then((reps: Policy[]) => setRows(reps))
            .catch((err: Error) => {
                setRows([])
                toaster(t("getting-data-failed",  { message: err.message }), 'error');
            });

        Rest.get<LicenseGroup[]>(auth, Rest.Endpoint.LicenseGroup)
            .then((rs: LicenseGroup[]) => setLicenseGroups(rs))
            .catch((err: Error) => toaster("Getting license group list failed: " + err.message, 'error'));
    }, [t, auth]);

    const handleCloseDialog = (dto: Policy|undefined) => {
        setDialogOpen(false);
        refresh();

        if (dto) {
            setFilter(dto.name);
        }
    }

    const handleDeleteRequest = (r: Policy) => {
        setSelectedEntity(r);
        setDeleteOpen(true);
    }

    const handleDelete = () => {
        Rest.deleteResource(auth, Rest.Endpoint.Policy, selectedEntity?.id)
            .then(() => refresh())
            .catch((err: Error) => toaster(t("deleting-failed", { message: err.message }), 'error'))
            .finally(() => setDeleteOpen(false))
    }

    useEffect(() => refresh(), [refresh]);

    return (
        <Box margin={3}>
            <TableHeaderControls createCaption={t("create-policy")}
                                 onCreateClicked={() => setDialogOpen(true)}
                                 onFilterChanged={f => setFilter(f)}
                                 onRefresh={refresh}
                                 role={Role.POLICY_CREATE}
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell width={"60px"}>{t("enabled")}</TableCell>
                            <TableCell>{t("name")}</TableCell>
                            <TableCell width={"60px"}>{t("type")}</TableCell>
                            <TableCell>{t("conditions-count")}</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows
                            .filter(r => ("" === filter || r.name.toLowerCase().includes(filter.toLowerCase())))
                            .map(row => (
                                <CollapsableTableRow key={row.name}
                                                     policy={row}
                                                     licenseGroups={licenseGroups}
                                                     onDeleteRequest={(dto) => handleDeleteRequest(dto)}
                                />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <CreatePolicyDialog open={dialogOpen} handleClose={(dto) => handleCloseDialog(dto)} />
            <YesNoDialog title={t("delete-policy")}
                         text={`Do ya really want to delete the policy '${selectedEntity?.name}'?`}
                         open={deleteOpen}
                         onYesClick={() => handleDelete()}
                         onNoClick={() => setDeleteOpen(false)}
            />
        </Box>
    );
}
