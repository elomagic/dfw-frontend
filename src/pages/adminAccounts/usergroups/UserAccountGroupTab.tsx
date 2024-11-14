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
import {UserAccountGroup} from "../../../DTOs.ts";
import * as Rest from "../../../RestClient.ts";
import TableHeaderControls from "../../../components/TableHeaderControls.tsx";
import CollapsableUserGroupTableRow from "./CollapsableUserGroupTableRow.tsx";
import CreateUserGroupDialog from "./CreateUserGroupDialog.tsx";
import {enqueueSnackbar} from "notistack";
import YesNoDialog from "../../../components/YesNoDialog.tsx";

export default function UserAccountGroupTab() {

    const { t } = useTranslation();
    const auth = useAuth();
    const [ rows, setRows ] = useState<UserAccountGroup[]>([]);
    const [ filter, setFilter ] = useState<string>("");
    const [ dialogOpen, setDialogOpen ] = useState<boolean>(false);
    const [ deleteOpen, setDeleteOpen ] = useState<boolean>(false);
    const [ selectedEntity, setSelectedEntity ] = useState<UserAccountGroup>();

    const refresh = useCallback(() => {
        Rest.get(auth, Rest.RestEndpoint.UserGroup)
            .then((res) => res.json())
            .then((dtos: UserAccountGroup[]) => {
                setRows(dtos);
            })
            .catch((err) => enqueueSnackbar("Getting data failed: " + err, { variant: 'error'} ));
    }, [auth]);

    const handleCloseDialog = () => {
        setDialogOpen(false);
        refresh();
        //todo Select new record?
    }

    const handleDeleteRequest = (ug: UserAccountGroup) => {
        setSelectedEntity(ug);
        setDeleteOpen(true);
    }

    const handleDelete = () => {
        Rest.deleteResource(auth, Rest.RestEndpoint.UserGroup, selectedEntity?.id)
            .then(() => refresh())
            .catch((err) => enqueueSnackbar("Deleting failed: " + err, { variant: 'error'} ));
    }

    useEffect(() => {
        refresh();
    }, [refresh]);

    return (
        <Box>
            <TableHeaderControls createCaption={t("create-user-group")}
                                 onCreateClicked={() => setDialogOpen(true)}
                                 onFilterChanged={f => setFilter(f)}
                                 onRefresh={refresh}
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("name")}</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows
                            .filter(r => ("" === filter || r.name.toLowerCase().includes(filter)))
                            .map((row) => (
                                <CollapsableUserGroupTableRow key={row.name}
                                                              userGroup={row}
                                                              onDeleteRequest={(id) => handleDeleteRequest(id)}
                                />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <CreateUserGroupDialog open={dialogOpen} handleClose={handleCloseDialog} />
            <YesNoDialog title={t("delete-user-group")}
                         text={`Do ya really want to delete the user group '${selectedEntity?.name}'?`}
                         open={deleteOpen}
                         onYesClick={() => handleDelete()}
                         onNoClick={() => setDeleteOpen(false)}
            />
        </Box>
    );
}