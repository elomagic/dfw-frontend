import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {LicenseNameMap} from "../../../DTOs.ts";
import {Collapse} from "@mui/material";
import {useState} from "react";
import EditableTableRow from "./EditableTableRow.tsx";

interface CollapsableNameMapTableRowProps {
    nameMap: LicenseNameMap
    onDeleteRequest: (nm: LicenseNameMap) => void;
}

export default function CollapsableNameMapTableRow({ nameMap, onDeleteRequest }: Readonly<CollapsableNameMapTableRowProps>) {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#292929" }}
                onClick={()=> setOpen(!open)}
            >
                <TableCell>{nameMap.nameMatch}</TableCell>
                <TableCell>{nameMap.spdxId}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <EditableTableRow nameMap={nameMap} onDeleteRequest={() => onDeleteRequest(nameMap)} />
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
