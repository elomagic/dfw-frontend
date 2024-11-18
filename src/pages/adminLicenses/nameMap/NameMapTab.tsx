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
import {LicenseNameMap} from "../../../DTOs.ts";
import * as Rest from "../../../RestClient.ts";
import TableHeaderControls from "../../../components/TableHeaderControls.tsx";
import {enqueueSnackbar} from "notistack";
import YesNoDialog from "../../../components/YesNoDialog.tsx";
import CollapsableNameMapTableRow from "./CollapsableNameMapTableRow.tsx";
import CreateNameMapDialog from "./CreateNameMapDialog.tsx";

export default function NameMapTab() {

    const { t } = useTranslation();
    const auth = useAuth();
    const [ rows, setRows ] = useState<LicenseNameMap[]>([]);
    const [ filter, setFilter ] = useState<string>("");
    const [ dialogOpen, setDialogOpen ] = useState<boolean>(false);
    const [ deleteOpen, setDeleteOpen ] = useState<boolean>(false);
    const [ selectedEntity, setSelectedEntity ] = useState<LicenseNameMap>();

    const refresh = useCallback(() => {
        Rest.get(auth, Rest.RestEndpoint.LicenseNameMap)
            .then((res) => res.json())
            .then((dtos: LicenseNameMap[]) => {
                setRows(dtos);
            })
            .catch((err: Error) => {
                setRows([])
                enqueueSnackbar(t("getting-data-failed",  { message: err.message }), { variant: 'error'} );
            });
    }, [t, auth]);

    const handleCloseDialog = () => {
        setDialogOpen(false);
        refresh();
        // todo Select new record?
    }

    const handleDeleteRequest = (nm: LicenseNameMap) => {
        setSelectedEntity(nm);
        setDeleteOpen(true);
    }

    const handleDelete = () => {
        Rest.deleteResource(auth, Rest.RestEndpoint.LicenseNameMap, selectedEntity?.id)
            .then(() => refresh())
            .catch((err: Error) => enqueueSnackbar(t("deleting-failed", { message: err.message }), { variant: 'error'} ))
            .finally(() => setDeleteOpen(false))
    }

    useEffect(() => {
        refresh();
    }, [refresh]);

    return (
        <Box>
            <TableHeaderControls createCaption={t("create-name-mapping")}
                                 onCreateClicked={() => setDialogOpen(true)}
                                 onFilterChanged={f => setFilter(f)}
                                 onRefresh={refresh}
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("name-match")}</TableCell>
                            <TableCell>{t("spdx-id")}</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows
                            .filter(r => ("" === filter || r.nameMatch.toLowerCase().includes(filter)))
                            .map((row) => (
                                <CollapsableNameMapTableRow key={row.id}
                                                         nameMap={row}
                                                         onDeleteRequest={(id) => handleDeleteRequest(id)}
                                />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <CreateNameMapDialog open={dialogOpen} handleClose={handleCloseDialog} />
            <YesNoDialog title={t("delete-name-mapping")}
                         text={`Do ya really want to delete the name match '${selectedEntity?.nameMatch}'?`}
                         open={deleteOpen}
                         onYesClick={() => handleDelete()}
                         onNoClick={() => setDeleteOpen(false)}
            />
        </Box>
    );
}