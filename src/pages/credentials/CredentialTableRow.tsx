import { CredentialData } from "../../DTOs.ts";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

interface TableRowProps {
    credential: CredentialData;
}

export default function CredentialTableRow({ credential }: Readonly<TableRowProps>) {

    return (
        <TableRow
            key={credential.credentialId}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell>{credential.credentialId}</TableCell>
            <TableCell>{credential.mode}</TableCell>
        </TableRow>
    );
}
