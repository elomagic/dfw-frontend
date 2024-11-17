import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {LicenseViolation} from "../../DTOs.ts";
import * as Rest from "../../RestClient.ts";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../auth/useAuth.ts";
import YesNoDialog from "../../components/YesNoDialog.tsx";
import TableHeaderControls from "../../components/TableHeaderControls.tsx";
import {enqueueSnackbar} from "notistack";
import CollapsableTableRow from "./CollapsableTableRow.tsx";

export default function LicenseIssuesView() {

    const { t } = useTranslation();
    const auth = useAuth();
    const [ rows, setRows ] = useState<LicenseViolation[]>([]);
    const [ filter, setFilter ] = useState<string>("");
    const [ deleteOpen, setDeleteOpen ] = useState<boolean>(false);
    const [ selectedEntity, setSelectedEntity ] = useState<LicenseViolation>();

    const refresh = useCallback(() => {
        Rest.get(auth, Rest.RestEndpoint.LicenseViolation)
            .then((res) => res.json())
            .then((reps: LicenseViolation[]) => {
                setRows(reps);
            })
            .catch((err: Error) => enqueueSnackbar("Getting data failed: " + err.message, { variant: 'error'} ));
    }, [auth]);

    const handleDeleteRequest = (r: LicenseViolation) => {
        setSelectedEntity(r);
        setDeleteOpen(true);
    }

    const handleDelete = () => {
        Rest.deleteResource(auth, Rest.RestEndpoint.Repository, selectedEntity?.id)
            .then(() => refresh())
            .catch((err: Error) => enqueueSnackbar("Deleting failed: " + err.message, { variant: 'error'} ));
    }

    useEffect(() => {
        refresh();
    }, [refresh]);

    return (
        <Box margin={3}>
            <TableHeaderControls onFilterChanged={f => setFilter(f)}
                                 onRefresh={refresh}
            />
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("purl")}</TableCell>
                            <TableCell>{t("license")}</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows
                            .filter(r => ("" === filter || r.purl.toLowerCase().includes(filter)))
                            .map((row) => (
                                <CollapsableTableRow key={row.id}
                                                     licenseViolation={row}
                                                     onDeleteRequest={(id) => handleDeleteRequest(id)}
                                />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <YesNoDialog title={t("delete-repository")}
                         text={`Do ya really want to delete the issue with PURL '${selectedEntity?.purl}'?`}
                         open={deleteOpen}
                         onYesClick={() => handleDelete()}
                         onNoClick={() => setDeleteOpen(false)}
            />
        </Box>
    );
}
