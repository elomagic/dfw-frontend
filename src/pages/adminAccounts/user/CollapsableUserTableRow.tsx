import TableCell from "@mui/material/TableCell";
import {Check} from "@mui/icons-material";
import TableRow from "@mui/material/TableRow";
import {UserAccount} from "../../../DTOs.ts";
import {Collapse} from "@mui/material";
import {useState} from "react";
import EditableTableRow from "./EditableTableRow.tsx";

interface CollapsableUserTableRowProps {
    user: UserAccount
    onDeleteRequest: (u: UserAccount) => void;
}

export default function CollapsableUserTableRow({ user, onDeleteRequest }: Readonly<CollapsableUserTableRowProps>) {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <TableRow
                key={user.mailAddress}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={()=> setOpen(!open)}
            >
                <TableCell>{user.mailAddress}</TableCell>
                <TableCell>{user.enabled ? <Check color="success" /> : ""}</TableCell>
                <TableCell>{user.displayName}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <EditableTableRow user={user} onDeleteRequest={() => onDeleteRequest(user)} />
                    </Collapse>
                </TableCell>

            </TableRow>
        </>
    );
}
