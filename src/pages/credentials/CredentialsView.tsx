"use client"

import {Box, Paper} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../auth/useAuth.ts";
import {useCallback, useEffect, useState} from "react";
import {CredentialData} from "../../DTOs.ts";
import * as Rest from "../../RestClient.ts";
import TableHeaderControls from "../../components/TableHeaderControls.tsx";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import CredentialTableRow from "./CredentialTableRow.tsx";
import YesNoDialog from "../../components/YesNoDialog.tsx";
import CreateCredentialDialog from "./CreateCredentialDialog.tsx";
import {Role} from "../../auth/Auth.tsx";
import {toaster} from "../../Toaster.ts";

export default function CredentialsView() {

    const { t } = useTranslation();
    const auth = useAuth();
    const [ rows, setRows ] = useState<CredentialData[]>([]);
    const [ filter, setFilter ] = useState<string>("");
    const [ dialogOpen, setDialogOpen ] = useState<boolean>(false);
    const [ deleteOpen, setDeleteOpen ] = useState<boolean>(false);
    const [ selectedEntity, setSelectedEntity ] = useState<CredentialData>();

    const refresh = useCallback(() => {
        Rest.get(auth, Rest.RestEndpoint.Credential)
            .then((res) => res.json())
            .then((cd: CredentialData[]) => {
                setRows(cd);
            })
            .catch((err: Error) => {
                setRows([])
                toaster(t("getting-data-failed",  { message: err.message }), 'error');
            });
    }, [t, auth]);

    const handleCloseDialog = (dto: CredentialData|undefined) => {
        setDialogOpen(false);
        refresh();

        if (dto) {
            setFilter(dto.credentialId);
        }
    }

    const handleDeleteRequest = (c: CredentialData) => {
        setSelectedEntity(c);
        setDeleteOpen(true);
    }

    const handleDelete = () => {
        Rest.deleteResource(auth, Rest.RestEndpoint.Credential, selectedEntity?.id)
            .then(() => refresh())
            .catch((err: Error) => toaster(t("deleting-failed", { message: err.message }), 'error'))
            .finally(() => setDeleteOpen(false))
    }

    useEffect(() => {
        refresh();
    }, [refresh]);

    return (
        <Box margin={3}>
            <TableHeaderControls createCaption={t("create-credential")}
                                 role={Role.CREDENTIAL_CREATE}
                                 onCreateClicked={() => setDialogOpen(true)}
                                 onFilterChanged={f => setFilter(f)}
                                 onRefresh={refresh}
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell width={"300px"}>{t("credentialId")}</TableCell>
                            <TableCell width={"200px"}>{t("mode")}</TableCell>
                            <TableCell>{t("action")}</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows
                            .filter(r => ("" === filter || r.credentialId.toLowerCase().includes(filter.toLowerCase())))
                            .map((row) => (
                                <CredentialTableRow key={row.credentialId}
                                                    credential={row}
                                                    onDeleteRequest={(dto) => handleDeleteRequest(dto)}
                                />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <CreateCredentialDialog open={dialogOpen} handleClose={(dto) => handleCloseDialog(dto)} />
            <YesNoDialog title={t("delete-credential")}
                         text={`Do ya really want to delete the credential '${selectedEntity?.credentialId}'?`}
                         open={deleteOpen}
                         onYesClick={() => handleDelete()}
                         onNoClick={() => setDeleteOpen(false)}
            />
        </Box>
    );
}
