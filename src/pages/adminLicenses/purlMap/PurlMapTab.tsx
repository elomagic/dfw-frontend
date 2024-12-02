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
import * as Rest from "../../../RestClient.ts";
import TableHeaderControls from "../../../components/TableHeaderControls.tsx";
import {enqueueSnackbar} from "notistack";
import YesNoDialog from "../../../components/YesNoDialog.tsx";
import {LicensePurlMap} from "../../../DTOs.ts";
import CollapsablePurlMapTableRow from "./CollapsablePurlMapTableRow.tsx";
import CreatePurlMapDialog from "./CreatePurlMapDialog.tsx";
import {Role} from "../../../auth/Auth.tsx";

export default function PurlMapTab() {

    const { t } = useTranslation();
    const auth = useAuth();
    const [ rows, setRows ] = useState<LicensePurlMap[]>([]);
    const [ filter, setFilter ] = useState<string>("");
    const [ dialogOpen, setDialogOpen ] = useState<boolean>(false);
    const [ deleteOpen, setDeleteOpen ] = useState<boolean>(false);
    const [ selectedEntity, setSelectedEntity ] = useState<LicensePurlMap>();

    const refresh = useCallback(() => {
        Rest.get(auth, Rest.RestEndpoint.LicensePurlMap)
            .then((res) => res.json())
            .then((dtos: LicensePurlMap[]) => {
                setRows(dtos);
            })
            .catch((err: Error) => {
                setRows([])
                enqueueSnackbar(t("getting-data-failed",  { message: err.message }), { variant: 'error'} );
            });
    }, [t, auth]);

    const handleCloseDialog = (dto: LicensePurlMap|undefined) => {
        setDialogOpen(false);
        refresh();

        if (dto) {
            setFilter(dto.purlMatch);
        }

    }

    const handleDeleteRequest = (pm: LicensePurlMap) => {
        setSelectedEntity(pm);
        setDeleteOpen(true);
    }

    const handleDelete = () => {
        Rest.deleteResource(auth, Rest.RestEndpoint.LicensePurlMap, selectedEntity?.id)
            .then(() => refresh())
            .catch((err: Error) => enqueueSnackbar(t("deleting-failed", { message: err.message }), { variant: 'error'} ))
            .finally(() => setDeleteOpen(false))
    }

    useEffect(() => {
        refresh();
    }, [refresh]);

    return (
        <Box>
            <TableHeaderControls createCaption={t("create-purl-mapping")}
                                 onCreateClicked={() => setDialogOpen(true)}
                                 onFilterChanged={f => setFilter(f)}
                                 onRefresh={refresh}
                                 role={Role.LICENSE_PURL_MAP_CREATE}
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("purl-match")}</TableCell>
                            <TableCell>{t("spdx-id")}</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows
                            .filter(r => ("" === filter || r.purlMatch.toLowerCase().includes(filter)))
                            .map((row) => (
                                <CollapsablePurlMapTableRow key={row.id}
                                                         purlMap={row}
                                                         onDeleteRequest={(id) => handleDeleteRequest(id)}
                                />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <CreatePurlMapDialog open={dialogOpen} handleClose={(dto) => handleCloseDialog(dto)} />
            <YesNoDialog title={t("delete-purl-mapping")}
                         text={`Do ya really want to delete the PURL match '${selectedEntity?.purlMatch}'?`}
                         open={deleteOpen}
                         onYesClick={() => handleDelete()}
                         onNoClick={() => setDeleteOpen(false)}
            />
        </Box>
    );
}