"use client"

import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import * as Rest from "../../RestClient.ts";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../auth/useAuth.ts";
import YesNoDialog from "../../components/YesNoDialog.tsx";
import TableHeaderControls from "../../components/TableHeaderControls.tsx";
import CollapsableTableRow from "./CollapsableTableRow.tsx";
import {toaster} from "../../Toaster.ts";
import {PolicyViolation} from "../../DTOs.ts";

export default function PolicyViolationsView() {

    const { t } = useTranslation();
    const auth = useAuth();
    const [ rows, setRows ] = useState<PolicyViolation[]>([]);
    const [ filter, setFilter ] = useState<string>("");
    const [ deleteOpen, setDeleteOpen ] = useState<boolean>(false);
    const [ selectedEntity, setSelectedEntity ] = useState<PolicyViolation>();

    const refresh = useCallback(() => {
        Rest.get(auth, Rest.RestEndpoint.PolicyViolation)
            .then((res) => res.json())
            .then((reps: PolicyViolation[]) => {
                setRows(reps);
            })
            .catch((err: Error) => {
                setRows([])
                toaster(t("getting-data-failed",  { message: err.message }), 'error');
            });
    }, [t, auth]);

    const handleDeleteRequest = (r: PolicyViolation) => {
        setSelectedEntity(r);
        setDeleteOpen(true);
    }

    const handleDelete = () => {
        Rest.deleteResource(auth, Rest.RestEndpoint.PolicyViolation, selectedEntity?.id)
            .then(() => refresh())
            .catch((err: Error) => toaster(t("deleting-failed", { message: err.message }), 'error'))
            .finally(() => setDeleteOpen(false))
    }

    useEffect(() => {
        refresh();
    }, [refresh]);

    return (
        <Box margin={3}>
            <TableHeaderControls onFilterChanged={f => setFilter(f)} onRefresh={refresh} />
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("name")}</TableCell>
                            <TableCell>{t("purl")}</TableCell>
                            <TableCell>{t("type")}</TableCell>
                            <TableCell>{t("state")}</TableCell>
                            <TableCell>{t("licenses")}</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows
                            .filter(r => ("" === filter || r.component.purl.toLowerCase().includes(filter.toLowerCase())))
                            .map((row) => (
                                <CollapsableTableRow key={row.id}
                                                     policyViolation={row}
                                                     onDeleteRequest={(dto) => handleDeleteRequest(dto)}
                                />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <YesNoDialog title={t("delete-policy-violation")}
                         text={t("Do ya really want to delete the issue with PURL {{name}} ({{purl}})", { name: selectedEntity?.component.name, purl: selectedEntity?.component.purl })}
                         open={deleteOpen}
                         onYesClick={() => handleDelete()}
                         onNoClick={() => setDeleteOpen(false)}
            />
        </Box>
    );
}
