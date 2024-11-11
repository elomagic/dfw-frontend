import {useTranslation} from "react-i18next";
import {Box, Paper} from "@mui/material";
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
import TableHeaderControls from "../../components/TableHeaderControls.tsx";
import CollapsableUserTableRow from "./CollapsableUserTableRow.tsx";

export default function UserAccountTab() {

    const { t } = useTranslation();
    const auth = useAuth();
    const [ rows, setRows ] = useState<UserAccount[]>([]);
    const [ filter, setFilter ] = useState<string>("");

    const handleCreate = () => {

    }

    const handleRefresh = () => {

    }

    useEffect(() => {
        Rest.get(auth, Rest.RestEndpoint.User)
            .then((res) => res.json())
            .then((dtos: UserAccount[]) => {
                setRows(dtos);
            })
            .catch((reason) => console.log(reason));
    }, [auth]);

    return (
        <Box>
            <TableHeaderControls createCaption="Create User"
                                 onCreateClicked={handleCreate}
                                 onFilterChanged={f => setFilter(f)}
                                 onRefresh={handleRefresh}
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
                            .filter(r => ("" === filter || r.mailAddress.toLowerCase().includes(filter)))
                            .map((row) => (<CollapsableUserTableRow key={row.mailAddress} user={row} />))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}