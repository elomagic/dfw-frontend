"use client"

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {LicenseViolation,} from "../../DTOs.ts";
import {Collapse} from "@mui/material";
import {useState} from "react";
import LicenseIssueTableRow from "./LicenseIssueTableRow.tsx";

interface ComponentProps {
    licenseViolation: LicenseViolation
    onDeleteRequest: (r: LicenseViolation) => void;
}

export default function CollapsableTableRow({ licenseViolation, onDeleteRequest }: Readonly<ComponentProps>) {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#292929" }}
                onClick={()=> setOpen(!open)}
            >
                <TableCell>{licenseViolation.purl}</TableCell>
                <TableCell>{licenseViolation.licenses.join(", ")}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{height: 0}} colSpan={2}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <LicenseIssueTableRow licenseViolation={licenseViolation} onDeleteRequest={() => onDeleteRequest(licenseViolation)} />
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
