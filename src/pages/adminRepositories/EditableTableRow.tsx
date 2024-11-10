import TableCell from "@mui/material/TableCell";
import {Check} from "@mui/icons-material";
import TableRow from "@mui/material/TableRow";
import {Repository} from "../../DTOs.ts";
import RepositoryTypeIcon from "../../components/RepositoryTypeIcon.tsx";

interface EditableTableRowProps {
    repository: Repository
}

export default function EditableTableRow({ repository }: Readonly<EditableTableRowProps>) {

    return (
        <TableRow
            key={repository.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            onClick={()=> {console.log("Row clicked")}}
        >
            <TableCell><RepositoryTypeIcon type={repository.type} /></TableCell>
            <TableCell>{repository.name}</TableCell>
            <TableCell>{repository.enabled ? <Check color="success" /> : ""}</TableCell>
            <TableCell>{repository.description}</TableCell>
            <TableCell>{repository.baseUri}</TableCell>
        </TableRow>
    );
}
