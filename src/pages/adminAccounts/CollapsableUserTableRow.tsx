import TableCell from "@mui/material/TableCell";
import {Check} from "@mui/icons-material";
import TableRow from "@mui/material/TableRow";
import {UserAccount} from "../../DTOs.ts";
import {Collapse} from "@mui/material";
import {useState} from "react";

interface CollapsableUserTableRowProps {
    user: UserAccount
}

export default function CollapsableUserTableRow({ user }: Readonly<CollapsableUserTableRowProps>) {

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

                    </Collapse>
                </TableCell>

            </TableRow>
        </>
    );
}
