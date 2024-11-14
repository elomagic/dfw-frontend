import {Box, Paper} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useCallback, useEffect, useState} from "react";
import * as Rest from "../../RestClient.ts"
import {Repository} from "../../DTOs.ts";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../auth/useAuth.ts";
import TableHeaderControls from "../../components/TableHeaderControls.tsx";
import CollapsableTableRow from "./CollapsableTableRow.tsx";
import CreateRepositoryDialog from "./CreateRepositoryDialog.tsx";
import {enqueueSnackbar} from "notistack";
import YesNoDialog from "../../components/YesNoDialog.tsx";

export default function AdminRepositoriesView() {

    const { t } = useTranslation();
    const auth = useAuth();
    const [ rows, setRows ] = useState<Repository[]>([]);
    const [ filter, setFilter ] = useState<string>("");
    const [ dialogOpen, setDialogOpen ] = useState<boolean>(false);
    const [ deleteOpen, setDeleteOpen ] = useState<boolean>(false);
    const [ selectedEntity, setSelectedEntity ] = useState<Repository>();

    const refresh = useCallback(() => {
        Rest.get(auth, Rest.RestEndpoint.Repository)
            .then((res) => res.json())
            .then((reps: Repository[]) => {
                setRows(reps);
            })
            .catch((err) => enqueueSnackbar("Getting data failed: " + err, { variant: 'error'} ));
    }, [auth]);

    const handleCloseDialog = () => {
        setDialogOpen(false);
        refresh();
        //todo Select new record?
    }

    const handleDeleteRequest = (r: Repository) => {
        setSelectedEntity(r);
        setDeleteOpen(true);
    }

    const handleDelete = () => {
        Rest.deleteResource(auth, Rest.RestEndpoint.Repository, selectedEntity?.id)
            .then(() => refresh())
            .catch((err) => enqueueSnackbar("Deleting failed: " + err, { variant: 'error'} ));
    }

    useEffect(() => {
        refresh();
    }, [refresh]);

    return (
        <Box margin={3}>
            <TableHeaderControls createCaption={t("create-repository")}
                                 onCreateClicked={() => setDialogOpen(true)}
                                 onFilterChanged={f => setFilter(f)}
                                 onRefresh={refresh}
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("type")}</TableCell>
                            <TableCell>{t("name")}</TableCell>
                            <TableCell>{t("enabled")}</TableCell>
                            <TableCell>{t("description")}</TableCell>
                            <TableCell>{t("url")}</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows
                            .filter(r => ("" === filter || r.name.toLowerCase().includes(filter)))
                            .map((row) => (
                                <CollapsableTableRow key={row.name}
                                                     repository={row}
                                                     onDeleteRequest={(id) => handleDeleteRequest(id)}
                                />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <CreateRepositoryDialog open={dialogOpen} handleClose={handleCloseDialog} />
            <YesNoDialog title={t("delete-repository")}
                         text={`Do ya really want to delete the repository '${selectedEntity?.name}'?`}
                         open={deleteOpen}
                         onYesClick={() => handleDelete()}
                         onNoClick={() => setDeleteOpen(false)}
            />
        </Box>
    );
}
