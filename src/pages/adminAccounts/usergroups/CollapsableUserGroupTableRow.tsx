import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {UserAccountGroup} from "../../../DTOs.ts";
import {Collapse} from "@mui/material";
import {useState} from "react";
import EditableTableRow from "./EditableTableRow.tsx";

interface CollapsableUserGroupTableRowProps {
    userGroup: UserAccountGroup
    onDeleteRequest: (ug: UserAccountGroup) => void;
}

export default function CollapsableUserGroupTableRow({ userGroup, onDeleteRequest }: Readonly<CollapsableUserGroupTableRowProps>) {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#292929" }}
                onClick={()=> setOpen(!open)}
            >
                <TableCell>{userGroup.name}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={1}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <EditableTableRow group={userGroup} onDeleteRequest={() => onDeleteRequest(userGroup)} />
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
