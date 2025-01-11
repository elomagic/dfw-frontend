import {Box, Paper} from "@mui/material";
import {useTranslation} from "react-i18next";
import TableHeaderControls from "../../components/TableHeaderControls.tsx";
import {Role} from "../../auth/Auth.tsx";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import YesNoDialog from "../../components/YesNoDialog.tsx";
import {useAuth} from "../../auth/useAuth.ts";
import {useCallback, useEffect, useState} from "react";
import {License, LicenseGroup} from "../../DTOs.ts";
import * as Rest from "../../RestClient.ts";
import {toaster} from "../../Toaster.ts";
import CollapsableTableRow from "./CollapsableTableRow.tsx";
import CreateLicenseGroupDialog from "./CreateLicenseGroupDialog.tsx";

export default function AdminLicenseGroupsView() {

    const { t } = useTranslation();
    const auth = useAuth();
    const [ rows, setRows ] = useState<LicenseGroup[]>([]);
    const [ filter, setFilter ] = useState<string>("");
    const [ dialogOpen, setDialogOpen ] = useState<boolean>(false);
    const [ deleteOpen, setDeleteOpen ] = useState<boolean>(false);
    const [ selectedEntity, setSelectedEntity ] = useState<LicenseGroup>();
    const [ licenses, setLicenses ] = useState<License[]>([]);

    const refresh = useCallback(() => {
        Rest.get(auth, Rest.RestEndpoint.LicenseGroup)
            .then((res) => res.json())
            .then((dto: LicenseGroup[]) => {
                setRows(dto);
            })
            .catch((err: Error) => {
                setRows([])
                toaster(t("getting-data-failed",  { message: err.message }), 'error');
            });

        Rest.get(auth, Rest.RestEndpoint.License)
            .then((res) => res.json())
            .then((rs: License[]) => setLicenses(rs))
            .catch((err: Error) => toaster("Getting license group list failed: " + err.message, 'error'));
    }, [t, auth]);

    const handleCloseDialog = (dto: LicenseGroup | undefined) => {
        setDialogOpen(false);
        refresh();

        if (dto) {
            setFilter(dto.name);
        }
    }

    const handleDeleteRequest = (r: LicenseGroup) => {
        setSelectedEntity(r);
        setDeleteOpen(true);
    }

    const handleDelete = () => {
        Rest.deleteResource(auth, Rest.RestEndpoint.LicenseGroup, selectedEntity?.id)
            .then(() => refresh())
            .catch((err: Error) => toaster(t("deleting-failed", { message: err.message }), 'error'))
            .finally(() => setDeleteOpen(false))
    }


    useEffect(() => {
        refresh();
    }, [refresh]);

    return (
        <Box margin={3}>
            <TableHeaderControls createCaption={t("create-license-group")}
                                 filter={filter}
                                 role={Role.LICENSE_GROUP_CREATE}
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
                                <CollapsableTableRow key={row.name}
                                                     licenseGroup={row}
                                                     licenses={licenses}
                                                     onDeleteRequest={(id) => handleDeleteRequest(id)}
                                />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <CreateLicenseGroupDialog open={dialogOpen} handleClose={(dto) => handleCloseDialog(dto)} />

            <YesNoDialog title={t("pages.admin-license-groups.dialog.delete.title")}
                         text={t("pages.admin-license-groups.dialog.delete.text", {name: selectedEntity?.name})}
                         open={deleteOpen}
                         onYesClick={() => handleDelete()}
                         onNoClick={() => setDeleteOpen(false)}
            />
        </Box>
    );
}
