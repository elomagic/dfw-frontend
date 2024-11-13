import {Box, Paper} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../auth/useAuth.ts";
import {useCallback, useEffect, useState} from "react";
import {CredentialData} from "../../DTOs.ts";
import * as Rest from "../../RestClient.ts";
import {enqueueSnackbar} from "notistack";
import TableHeaderControls from "../../components/TableHeaderControls.tsx";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import CreateRepositoryDialog from "../adminRepositories/CreateRepositoryDialog.tsx";
import CredentialTableRow from "./CredentialTableRow.tsx";
import YesNoDialog from "../../components/YesNoDialog.tsx";

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
            .catch((err) => enqueueSnackbar("Getting data failed: " + err, { variant: 'error'} ));
    }, [auth]);

    const handleCloseDialog = () => {
        setDialogOpen(false);
        refresh();
        //todo Select new record?
    }

    const handleDeleteRequest = (c: CredentialData) => {
        setSelectedEntity(c);
        setDeleteOpen(true);
    }

    const handleDelete = () => {
        Rest.deleteResource(auth, Rest.RestEndpoint.Credential, selectedEntity?.id)
            .then(() => refresh())
            .catch((err) => enqueueSnackbar("Deleting failed: " + err, { variant: 'error'} ));
    }

    useEffect(() => {
        refresh();
    }, [refresh]);

    return (
        <Box margin={3}>
            <TableHeaderControls createCaption={t("create-credential")}
                                 onCreateClicked={() => setDialogOpen(true)}
                                 onFilterChanged={f => setFilter(f)}
                                 onRefresh={refresh}
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("credentialId")}</TableCell>
                            <TableCell>{t("mode")}</TableCell>
                            <TableCell>{t("action")}</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows
                            .filter(r => ("" === filter || r.credentialId.toLowerCase().includes(filter)))
                            .map((row) => (
                                <CredentialTableRow key={row.credentialId}
                                                    credential={row}
                                                    onDeleteRequest={(id) => handleDeleteRequest(id)}
                                />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <CreateRepositoryDialog open={dialogOpen} handleClose={handleCloseDialog} />
            <YesNoDialog title="Delete Credential"
                         text="Do ya really want to delete the credential?"
                         open={deleteOpen}
                         onYesClick={() => handleDelete()}
                         onNoClick={() => setDeleteOpen(false)}
            />
        </Box>
    );
}
