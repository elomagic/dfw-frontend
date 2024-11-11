import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {UserAccountGroup} from "../../DTOs.ts";
import {Collapse} from "@mui/material";
import {useState} from "react";

interface CollapsableUserGroupTableRowProps {
    userGroup: UserAccountGroup
}

export default function CollapsableUserGroupTableRow({ userGroup }: Readonly<CollapsableUserGroupTableRowProps>) {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <TableRow
                key={userGroup.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={()=> setOpen(!open)}
            >
                <TableCell>{userGroup.name}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={1}>
                    <Collapse in={open} timeout="auto" unmountOnExit>

                    </Collapse>
                </TableCell>

            </TableRow>
        </>
    );
}
