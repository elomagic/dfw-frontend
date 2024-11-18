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
    onDeleteRequest: (r: Repository) => void;
}

export default function CollapsableTableRow({ repository, onDeleteRequest }: Readonly<CollapsableTableRowProps>) {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#292929" }}
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
                        <EditableTableRow repository={repository} onDeleteRequest={() => onDeleteRequest(repository)} />
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
