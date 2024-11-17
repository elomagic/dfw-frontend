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
            .catch((err: Error) => enqueueSnackbar("Getting data failed: " + err.message, { variant: 'error'} ));
    }, [auth]);

    const handleCloseDialog = () => {
        setDialogOpen(false);
        refresh();
        // todo Select new record?
    }

    const handleDeleteRequest = (pm: LicensePurlMap) => {
        setSelectedEntity(pm);
        setDeleteOpen(true);
    }

    const handleDelete = () => {
        Rest.deleteResource(auth, Rest.RestEndpoint.User, selectedEntity?.id)
            .then(() => refresh())
            .catch((err: Error) => enqueueSnackbar("Deleting failed: " + err.message, { variant: 'error'} ));
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

            <CreatePurlMapDialog open={dialogOpen} handleClose={handleCloseDialog} />
            <YesNoDialog title={t("delete-purl-mapping")}
                         text={`Do ya really want to delete the PURL match '${selectedEntity?.purlMatch}'?`}
                         open={deleteOpen}
                         onYesClick={() => handleDelete()}
                         onNoClick={() => setDeleteOpen(false)}
            />
        </Box>
    );
}