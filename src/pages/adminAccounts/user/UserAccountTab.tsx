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
import TableHeaderControls from "../../../components/TableHeaderControls.tsx";
import CollapsableUserTableRow from "./CollapsableUserTableRow.tsx";
import CreateUserDialog from "./CreateUserDialog.tsx";
import {enqueueSnackbar} from "notistack";
import YesNoDialog from "../../../components/YesNoDialog.tsx";
import {Role} from "../../../auth/Auth.tsx";

export default function UserAccountTab() {

    const { t } = useTranslation();
    const auth = useAuth();
    const [ rows, setRows ] = useState<UserAccount[]>([]);
    const [ filter, setFilter ] = useState<string>("");
    const [ dialogOpen, setDialogOpen ] = useState<boolean>(false);
    const [ deleteOpen, setDeleteOpen ] = useState<boolean>(false);
    const [ selectedEntity, setSelectedEntity ] = useState<UserAccount>();

    const refresh = useCallback(() => {
        Rest.get(auth, Rest.RestEndpoint.User)
            .then((res) => res.json())
            .then((dtos: UserAccount[]) => {
                setRows(dtos);
            })
            .catch((err: Error) => {
                setRows([])
                enqueueSnackbar(t("getting-data-failed",  { message: err.message }), { variant: 'error' } );
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
        Rest.deleteResource(auth, Rest.RestEndpoint.User, selectedEntity?.id)
            .then(() => refresh())
            .catch((err: Error) => enqueueSnackbar(t("deleting-failed", { message: err.message }), { variant: 'error' } ))
            .finally(() => setDeleteOpen(false))
    }

    useEffect(() => {
        refresh();
    }, [refresh]);

    return (
        <Box>
            <TableHeaderControls createCaption={t("create-user")}
                                 onCreateClicked={() => setDialogOpen(true)}
                                 onFilterChanged={f => setFilter(f)}
                                 onRefresh={refresh}
                                 createRole={Role.USERACCOUNT_CREATE}
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("mailAddress")}</TableCell>
                            <TableCell>{t("enabled")}</TableCell>
                            <TableCell>{t("displayName")}</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows
                            .filter(r => ("" === filter || r.mailAddress.toLowerCase().includes(filter)))
                            .map((row) => (
                                <CollapsableUserTableRow key={row.mailAddress}
                                                         user={row}
                                                         onDeleteRequest={(id) => handleDeleteRequest(id)}
                                />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <CreateUserDialog open={dialogOpen} handleClose={(dto) => handleCloseDialog(dto)} />
            <YesNoDialog title={t("delete-user-account")}
                         text={`Do ya really want to delete the user account '${selectedEntity?.mailAddress}'?`}
                         open={deleteOpen}
                         onYesClick={() => handleDelete()}
                         onNoClick={() => setDeleteOpen(false)}
            />
        </Box>
    );
}