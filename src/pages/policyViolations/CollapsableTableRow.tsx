"use client"

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {Collapse} from "@mui/material";
import {useState} from "react";
import PolicyViolationTableRow from "./PolicyViolationTableRow.tsx";
import {PolicyViolation} from "../../DTOs.ts";

interface ComponentProps {
    policyViolation: PolicyViolation
    onDeleteRequest: (r: PolicyViolation) => void;
}

export default function CollapsableTableRow({ policyViolation, onDeleteRequest }: Readonly<ComponentProps>) {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#292929" }}
                onClick={()=> setOpen(!open)}
            >
                <TableCell>{policyViolation.component.name}</TableCell>
                <TableCell>{policyViolation.component.purl}</TableCell>
                <TableCell>{policyViolation.type}</TableCell>
                <TableCell>{policyViolation.violationState}</TableCell>
                <TableCell>{policyViolation.component.licenses.join(", ")}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{height: 0}} colSpan={2}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <PolicyViolationTableRow policyViolation={policyViolation} onDeleteRequest={() => onDeleteRequest(policyViolation)} />
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
