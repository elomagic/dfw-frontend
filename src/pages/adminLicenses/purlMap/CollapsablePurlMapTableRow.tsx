import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {LicensePurlMap} from "../../../DTOs.ts";
import {Collapse} from "@mui/material";
import {useState} from "react";
import EditableTableRow from "./EditableTableRow.tsx";

interface CollapsablePurlMapTableRowProps {
    purlMap: LicensePurlMap
    onDeleteRequest: (pm: LicensePurlMap) => void;
}

export default function CollapsablePurlMapTableRow({ purlMap, onDeleteRequest }: Readonly<CollapsablePurlMapTableRowProps>) {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <TableRow
                key={purlMap.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={()=> setOpen(!open)}
            >
                <TableCell>{purlMap.purlMatch}</TableCell>
                <TableCell>{purlMap.spdxId}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <EditableTableRow purlMap={purlMap} onDeleteRequest={() => onDeleteRequest(purlMap)} />
                    </Collapse>
                </TableCell>

            </TableRow>
        </>
    );
}
