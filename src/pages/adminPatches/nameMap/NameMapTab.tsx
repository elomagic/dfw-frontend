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
import YesNoDialog from "../../../components/YesNoDialog.tsx";
import CollapsableNameMapTableRow from "./CollapsableNameMapTableRow.tsx";
import CreateNameMapDialog from "./CreateNameMapDialog.tsx";
import {Role} from "../../../auth/Auth.tsx";
import {toaster} from "../../../Toaster.ts";

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
                toaster(t("getting-data-failed",  { message: err.message }), 'error');
            });
    }, [t, auth]);

    const handleCloseDialog = (dto: LicenseNameMap|undefined) => {
        setDialogOpen(false);
        refresh();

        if (dto) {
            setFilter(dto.nameMatch);
        }
    }

    const handleDeleteRequest = (nm: LicenseNameMap) => {
        setSelectedEntity(nm);
        setDeleteOpen(true);
    }

    const handleDelete = () => {
        Rest.deleteResource(auth, Rest.RestEndpoint.LicenseNameMap, selectedEntity?.id)
            .then(() => refresh())
            .catch((err: Error) => toaster(t("deleting-failed", { message: err.message }), 'error'))
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
                                 role={Role.LICENSE_NAME_MAP_CREATE}
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell width={"50%"}>{t("name-match")}</TableCell>
                            <TableCell width={"50%"}>{t("spdx-id")}</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows
                            .filter(r => ("" === filter || r.nameMatch.toLowerCase().includes(filter.toLowerCase())))
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

            <CreateNameMapDialog open={dialogOpen} handleClose={(dto) => handleCloseDialog(dto)} />
            <YesNoDialog title={t("delete-name-mapping")}
                         text={`Do ya really want to delete the name match '${selectedEntity?.nameMatch}'?`}
                         open={deleteOpen}
                         onYesClick={() => handleDelete()}
                         onNoClick={() => setDeleteOpen(false)}
            />
        </Box>
    );
}