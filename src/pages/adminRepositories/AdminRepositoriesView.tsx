import {Box, Paper} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useCallback, useEffect, useState} from "react";
import * as Rest from "../../RestClient.ts"
import {Configuration, Repository} from "../../DTOs.ts";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../auth/useAuth.ts";
import TableHeaderControls from "../../components/TableHeaderControls.tsx";
import CollapsableTableRow from "./CollapsableTableRow.tsx";
import CreateRepositoryDialog from "./CreateRepositoryDialog.tsx";
import {enqueueSnackbar} from "notistack";
import YesNoDialog from "../../components/YesNoDialog.tsx";
import {Role} from "../../auth/Auth.tsx";

export default function AdminRepositoriesView() {

    const { t } = useTranslation();
    const auth = useAuth();
    const [ rows, setRows ] = useState<Repository[]>([]);
    const [ internalBaseUrl, setInternalBaseUrl ] = useState<string>("https://?");
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
            .catch((err: Error) => {
                setRows([])
                enqueueSnackbar(t("getting-data-failed",  { message: err.message }), { variant: 'error'} );
            });
    }, [t, auth]);

    const handleCloseDialog = (dto: Repository|undefined) => {
        setDialogOpen(false);
        refresh();

        if (dto) {
            setFilter(dto.name);
        }
    }

    const handleDeleteRequest = (r: Repository) => {
        setSelectedEntity(r);
        setDeleteOpen(true);
    }

    const handleDelete = () => {
        Rest.deleteResource(auth, Rest.RestEndpoint.Repository, selectedEntity?.id)
            .then(() => refresh())
            .catch((err: Error) => enqueueSnackbar(t("deleting-failed", { message: err.message }), { variant: 'error'} ))
            .finally(() => setDeleteOpen(false))
    }

    useEffect(() => {
        refresh();
    }, [refresh]);

    useEffect(() => {
        Rest.get(auth, Rest.RestEndpoint.Configuration)
            .then((res) => res.json())
            .then((entities: Configuration[]) => {
                return entities.filter((e) => e.key === "COMMON_BASE_URL")[0];
            })
            .then((c: Configuration) => setInternalBaseUrl(c.value))
            .catch((err: Error) => {
                setRows([])
                enqueueSnackbar(t("getting-data-failed",  { message: err.message }), { variant: 'error'} );
            });
    }, [auth, t]);

    return (
        <Box margin={3}>
            <TableHeaderControls createCaption={t("create-repository")}
                                 onCreateClicked={() => setDialogOpen(true)}
                                 onFilterChanged={f => setFilter(f)}
                                 onRefresh={refresh}
                                 role={Role.REPOSITORY_CREATE}
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
                            .filter(r => ("" === filter || r.name.toLowerCase().includes(filter)))
                            .map((row) => (
                                <CollapsableTableRow key={row.name}
                                                     repository={row}
                                                     internalBaseUrl={internalBaseUrl}
                                                     onDeleteRequest={(id) => handleDeleteRequest(id)}
                                />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <CreateRepositoryDialog open={dialogOpen} handleClose={(dto) => handleCloseDialog(dto)} />
            <YesNoDialog title={t("delete-repository")}
                         text={`Do ya really want to delete the repository '${selectedEntity?.name}'?`}
                         open={deleteOpen}
                         onYesClick={() => handleDelete()}
                         onNoClick={() => setDeleteOpen(false)}
            />
        </Box>
    );
}
