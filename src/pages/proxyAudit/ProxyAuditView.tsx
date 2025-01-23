"use client"

import {Box, Paper} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../auth/useAuth.ts";
import {useCallback, useEffect, useState} from "react";
import {ProxyAudit} from "../../DTOs.ts";
import * as Rest from "../../RestClient.ts";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {toaster} from "../../Toaster.ts";
import { TableHeaderControls } from "../../components/TableHeaderControls.tsx";
import {ProxyAuditTableRow} from "./ProxyAuditTableRow.tsx";

export const ProxyAuditView = () => {

    const { t } = useTranslation();
    const auth = useAuth();
    const [ rows, setRows ] = useState<ProxyAudit[]>([]);
    const [ filter, setFilter ] = useState<string>("");

    const refresh = useCallback(() => {
        Rest.get<ProxyAudit[]>(auth, Rest.Endpoint.ProxyAudit)
            .then((cd: ProxyAudit[]) => setRows(cd))
            .catch((err: Error) => {
                setRows([])
                toaster(t("getting-data-failed",  { message: err.message }), 'error');
            });
    }, [t, auth]);

    useEffect(() => refresh(), [refresh]);

    return (
        <Box margin={3}>
            <TableHeaderControls onFilterChanged={f => setFilter(f)} onRefresh={refresh}/>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell width={"100px"}>{t("permitted")}</TableCell>
                            <TableCell>{t("proxy")}</TableCell>
                            <TableCell>{t("purl")}</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows
                            .filter(r => ("" === filter || r.component.purl.toLowerCase().includes(filter.toLowerCase())))
                            .map(row => <ProxyAuditTableRow key={row.id} data={row}/>)
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
