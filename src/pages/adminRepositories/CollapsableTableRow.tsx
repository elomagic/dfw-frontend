import TableCell from "@mui/material/TableCell";
import {Check} from "@mui/icons-material";
import TableRow from "@mui/material/TableRow";
import {Repository} from "../../DTOs.ts";
import RepositoryTypeIcon from "../../components/RepositoryTypeIcon.tsx";
import {Collapse} from "@mui/material";
import {useState} from "react";
import EditableTableRow from "./EditableTableRow.tsx";

interface CollapsableTableRowProps {
    repository: Repository
}

export default function CollapsableTableRow({ repository }: Readonly<CollapsableTableRowProps>) {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <TableRow
                key={repository.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={()=> setOpen(!open)}
            >
                <TableCell><RepositoryTypeIcon type={repository.type} /></TableCell>
                <TableCell>{repository.name}</TableCell>
                <TableCell>{repository.enabled ? <Check color="success" /> : ""}</TableCell>
                <TableCell>{repository.description}</TableCell>
                <TableCell>{repository.baseUri}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <EditableTableRow repository={repository} />
                    </Collapse>
                </TableCell>

            </TableRow>
        </>
    );
}
