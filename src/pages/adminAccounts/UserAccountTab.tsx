import {useTranslation} from "react-i18next";
import {Paper} from "@mui/material";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {useAuth} from "../../auth/useAuth.ts";
import {useEffect, useState} from "react";
import {UserAccount} from "../../DTOs.ts";
import * as Rest from "../../RestClient.ts";

export default function UserAccountTab() {

    const { t } = useTranslation();
    const auth = useAuth();
    const [ rows, setRows ] = useState<UserAccount[]>([]);

    useEffect(() => {
        Rest.get(auth, Rest.RestEndpoint.User)
            .then((res) => res.json())
            .then((dtos: UserAccount[]) => {
                setRows(dtos);
            })
            .catch((reason) => console.log(reason));
    }, [auth]);

    return (
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
                    {rows.map((row) => (
                        <TableRow
                            key={row.mailAddress}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{row.mailAddress}</TableCell>
                            <TableCell>{row.enabled}</TableCell>
                            <TableCell>{row.displayName}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}