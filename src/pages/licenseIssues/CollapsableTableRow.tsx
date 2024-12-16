import {LicenseViolation,} from "../../DTOs.ts";
import {useState} from "react";
import LicenseIssueTableRow from "./LicenseIssueTableRow.tsx";
import {TableCell, TableRow} from "../../components/ui/table.tsx";
import {Collapsible, CollapsibleContent} from "../../components/ui/collapsible.tsx";

interface CollapsableTableRowProps {
    licenseViolation: LicenseViolation
    onDeleteRequest: (r: LicenseViolation) => void;
}

export default function CollapsableTableRow({ licenseViolation, onDeleteRequest }: Readonly<CollapsableTableRowProps>) {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <TableRow onClick={()=> setOpen(!open)}>
                <TableCell>{licenseViolation.purl}</TableCell>
                <TableCell>{licenseViolation.licenses.join(", ")}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
                    <Collapsible open={open}>
                        <CollapsibleContent>
                            <LicenseIssueTableRow licenseViolation={licenseViolation} onDeleteRequest={() => onDeleteRequest(licenseViolation)} />
                        </CollapsibleContent>
                    </Collapsible>
                </TableCell>
            </TableRow>
        </>
    );
}
