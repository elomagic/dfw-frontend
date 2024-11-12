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

export default function UserAccountGroupTab() {

    const { t } = useTranslation();
    const auth = useAuth();
    const [ rows, setRows ] = useState<UserAccountGroup[]>([]);
    const [ filter, setFilter ] = useState<string>("");
    const [ dialogOpen, setDialogOpen ] = useState<boolean>(false);

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

    useEffect(() => {
        refresh();
    }, [refresh]);

    return (
        <Box>
            <TableHeaderControls createCaption="Create User Group"
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
                            .map((row) => (<CollapsableUserGroupTableRow key={row.name} userGroup={row} />))}
                    </TableBody>
                </Table>
            </TableContainer>

            <CreateUserGroupDialog open={dialogOpen} handleClose={handleCloseDialog} />
        </Box>
    );
}