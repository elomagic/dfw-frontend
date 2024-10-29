import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {AuthContextProps, useAuth} from "../../Auth.ts";
import {useEffect, useState} from "react";
import {LicenseViolation} from "../../DTOs.ts";
import * as Rest from "../../RestClient.ts";
import {useTranslation} from "react-i18next";

export default function LicensesView() {

    const { t } = useTranslation();
    const auth: AuthContextProps = useAuth();
    const [ rows, setRows ] = useState<LicenseViolation[]>([]);

    useEffect(() => {
        Rest.get(auth, Rest.RestEndpoint.LicenseViolation)
            .then((res) => res.json())
            .then((reps: LicenseViolation[]) => {
                setRows(reps);
            })
            .catch((reason: any) => console.log(reason));
    }, [auth]);

    return (
        <Box margin={3}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("purl")}</TableCell>
                            <TableCell>{t("license")}</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.purl}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{row.licenses}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </TableContainer>
        </Box>
    );
}
