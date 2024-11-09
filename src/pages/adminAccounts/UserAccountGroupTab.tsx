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
import {UserAccountGroup} from "../../DTOs.ts";
import * as Rest from "../../RestClient.ts";

export default function UserAccountGroupTab() {

    const { t } = useTranslation();
    const auth = useAuth();
    const [ rows, setRows ] = useState<UserAccountGroup[]>([]);

    useEffect(() => {
        Rest.get(auth, Rest.RestEndpoint.UserGroup)
            .then((res) => res.json())
            .then((dtos: UserAccountGroup[]) => {
                setRows(dtos);
            })
            .catch((reason) => console.log(reason));
    }, [auth]);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 900 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>{t("name")}</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{row.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}