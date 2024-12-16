import { CredentialData } from "../../DTOs.ts";
import {useAuth} from "../../auth/useAuth.ts";
import {Role} from "../../auth/Auth.tsx";
import {TableCell, TableRow} from "../../components/ui/table.tsx";
import {Button} from "../../components/ui/button.tsx";
import {MdDeleteForever} from "react-icons/md";

interface TableRowProps {
    credential: CredentialData;
    onDeleteRequest: (cd: CredentialData) => void;
}

export default function CredentialTableRow({ credential, onDeleteRequest }: Readonly<TableRowProps>) {

    const auth = useAuth();

    return (
        <TableRow>
            <TableCell>{credential.credentialId}</TableCell>
            <TableCell>{credential.mode}</TableCell>
            <TableCell>
                {auth.roles.includes(Role.CREDENTIAL_DELETE) && <Button size="icon" onClick={() => onDeleteRequest(credential)}><MdDeleteForever/></Button>}
            </TableCell>
        </TableRow>
    );
}
