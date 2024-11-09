import {Box, Paper} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useEffect, useState} from "react";
import * as Rest from "../../RestClient.ts"
import {Repository} from "../../DTOs.ts";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../auth/useAuth.ts";

/*
function createData(
    type: RepositoryTypes,
    name: string,
    description: string | undefined,
    baseUri: string | undefined
): Repository {
    return { type, name, description, baseUri };
}

const rows: Repository[]= [
    createData('MAVEN', 'Central Repository', undefined, 'https://repo1.maven.org/maven2/'),
    createData('MAVEN', 'Ice cream sandwich', undefined, ''),
    createData('NPM', 'Eclair', undefined, ''),
    createData('NPM', 'Cupcake', undefined, ''),
    createData('DOCKER', 'Public Docker Hub', undefined, '49'),
];
*/

export default function AdminRepositoriesView() {

    const { t } = useTranslation();
    const auth = useAuth();
    const [ rows, setRows ] = useState<Repository[]>([]);

    useEffect(() => {
        Rest.get(auth, Rest.RestEndpoint.Repository)
            .then((res) => res.json())
            .then((reps: Repository[]) => {
                setRows(reps);
            })
            .catch((reason) => console.log(reason));
    }, [auth]);

    return (
        <Box margin={3}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("type")}</TableCell>
                            <TableCell>{t("name")}</TableCell>
                            <TableCell>{t("description")}</TableCell>
                            <TableCell>{t("url")}</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{row.type}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>{row.baseUri}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
