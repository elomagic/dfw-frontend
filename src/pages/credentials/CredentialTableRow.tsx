import { CredentialData } from "../../DTOs.ts";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {DeleteForever} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {useAuth} from "../../auth/useAuth.ts";
import {Role} from "../../auth/Auth.tsx";

interface ComponentProps {
    credential: CredentialData;
    onDeleteRequest: (cd: CredentialData) => void;
}

export default function CredentialTableRow({ credential, onDeleteRequest }: Readonly<ComponentProps>) {

    const auth = useAuth();

    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#292929" }}
        >
            <TableCell>{credential.credentialId}</TableCell>
            <TableCell>{credential.mode}</TableCell>
            <TableCell>
                {auth.roles.includes(Role.CREDENTIAL_DELETE) && <IconButton onClick={() => onDeleteRequest(credential)}><DeleteForever/></IconButton>}
            </TableCell>
        </TableRow>
    );
}
