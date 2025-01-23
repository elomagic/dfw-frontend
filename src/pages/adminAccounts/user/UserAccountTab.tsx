"use client"

import {useTranslation} from "react-i18next";
import {Box, Paper} from "@mui/material";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {useAuth} from "../../../auth/useAuth.ts";
import {useCallback, useEffect, useState} from "react";
import {UserAccount} from "../../../DTOs.ts";
import * as Rest from "../../../RestClient.ts";
import CollapsableTableRow from "./CollapsableTableRow.tsx";
import CreateUserDialog from "./CreateUserDialog.tsx";
import {Role} from "../../../auth/Auth.tsx";
import { toaster } from "../../../Toaster.ts";
import {TableHeaderControls} from "../../../components/TableHeaderControls.tsx";
import { YesNoDialog } from "../../../components/YesNoDialog.tsx";

export default function UserAccountTab() {

    const { t } = useTranslation();
    const auth = useAuth();
    const [ rows, setRows ] = useState<UserAccount[]>([]);
    const [ filter, setFilter ] = useState<string>("");
    const [ dialogOpen, setDialogOpen ] = useState<boolean>(false);
    const [ deleteOpen, setDeleteOpen ] = useState<boolean>(false);
    const [ selectedEntity, setSelectedEntity ] = useState<UserAccount>();

    const refresh = useCallback(() => {
        Rest.get<UserAccount[]>(auth, Rest.Endpoint.User)
            .then((dtos: UserAccount[]) => setRows(dtos))
            .catch((err: Error) => {
                setRows([])
                toaster(t("getting-data-failed", { message: err.message }), 'error');
            });
    }, [t, auth]);

    const handleCloseDialog = (dto: UserAccount|undefined) => {
        setDialogOpen(false);
        refresh();

        if (dto) {
            setFilter(dto.mailAddress)
        }
    }

    const handleDeleteRequest = (u: UserAccount) => {
        setSelectedEntity(u);
        setDeleteOpen(true);
    }

    const handleDelete = () => {
        Rest.deleteResource(auth, Rest.Endpoint.User, selectedEntity?.id)
            .then(() => refresh())
            .catch((err: Error) => toaster(t("deleting-failed", { message: err.message }), 'error'))
            .finally(() => setDeleteOpen(false))
    }

    useEffect(() => refresh(), [refresh]);

    return (
        <Box>
            <TableHeaderControls createCaption={t("create-user")}
                                 onCreateClicked={() => setDialogOpen(true)}
                                 onFilterChanged={f => setFilter(f)}
                                 onRefresh={refresh}
                                 role={Role.USERACCOUNT_CREATE}
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell width={"400px"}>{t("mailAddress")}</TableCell>
                            <TableCell width={"60px"}>{t("enabled")}</TableCell>
                            <TableCell>{t("displayName")}</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows
                            .filter(r => ("" === filter || r.mailAddress.toLowerCase().includes(filter.toLowerCase())))
                            .map((row) => (
                                <CollapsableTableRow key={row.mailAddress}
                                                     user={row}
                                                     onDeleteRequest={(dto) => handleDeleteRequest(dto)}
                                />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <CreateUserDialog open={dialogOpen} handleClose={(dto) => handleCloseDialog(dto)} />
            <YesNoDialog title={t("pages.admin-accounts.user.dialog.delete.title")}
                         text={t("pages.admin-accounts.user.dialog.delete.text", {mailAddress: selectedEntity?.mailAddress})}
                         open={deleteOpen}
                         onYesClick={() => handleDelete()}
                         onNoClick={() => setDeleteOpen(false)}
            />
        </Box>
    );
}