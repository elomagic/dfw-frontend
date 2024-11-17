import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {LicenseViolation,} from "../../DTOs.ts";
import {Collapse} from "@mui/material";
import {useState} from "react";
import LicenseIssueTableRow from "./LicenseIssueTableRow.tsx";

interface CollapsableTableRowProps {
    licenseViolation: LicenseViolation
    onDeleteRequest: (r: LicenseViolation) => void;
}

export default function CollapsableTableRow({ licenseViolation, onDeleteRequest }: Readonly<CollapsableTableRowProps>) {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <TableRow
                key={licenseViolation.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={()=> setOpen(!open)}
            >
                <TableCell>{licenseViolation.purl}</TableCell>
                <TableCell>{licenseViolation.licenses.join(", ")}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <LicenseIssueTableRow licenseViolation={licenseViolation} onDeleteRequest={() => onDeleteRequest(licenseViolation)} />
                    </Collapse>
                </TableCell>

            </TableRow>
        </>
    );
}
