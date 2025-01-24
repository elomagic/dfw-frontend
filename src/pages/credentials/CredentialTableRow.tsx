"use client"

import { CredentialData } from "../../DTOs.ts";
import TableCell from "@mui/material/TableCell";
import {DeleteForever} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {useAuth} from "../../auth/useAuth.ts";
import {Role} from "../../auth/Role.ts";
import { TableDataRow } from "../../components/TableDataRow.tsx";

interface ComponentProps {
    credential: CredentialData;
    onDeleteRequest: (cd: CredentialData) => void;
}

export const CredentialTableRow = ({ credential, onDeleteRequest }: Readonly<ComponentProps>) => {

    const auth = useAuth();

    return (
        <TableDataRow>
            <TableCell>{credential.credentialId}</TableCell>
            <TableCell>{credential.mode}</TableCell>
            <TableCell>
                {auth.roles.includes(Role.CREDENTIAL_DELETE) && <IconButton onClick={() => onDeleteRequest(credential)}><DeleteForever color={"error"}/></IconButton>}
            </TableCell>
        </TableDataRow>
    );
}
