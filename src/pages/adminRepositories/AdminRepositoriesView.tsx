import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import * as Rest from "../../RestClient.ts"
import {AuthContextProps, useAuth} from "../../Auth.ts";
import {Repository} from "../../DTOs.ts";

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

    const auth: AuthContextProps = useAuth();
    const [ rows, setRows ] = useState<Repository[]>([]);

    useEffect(() => {
        Rest.get(auth, Rest.RestEndpoint.Repository)
            .then((res) => res.json())
            .then((reps: Repository[]) => {
                setRows(reps);
            });
    }, [auth]);

    return (
        <Box margin={3}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>URL</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
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
            </TableContainer>
        </Box>
    );
}
