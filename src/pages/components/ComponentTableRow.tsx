import {Component} from "../../DTOs.ts";
import RepositoryTypeIcon from "../../components/RepositoryTypeIcon.tsx";
import {TableCell, TableRow} from "../../components/ui/table.tsx";

interface TableRowProps {
    component: Component;
}

export default function ComponentTableRow({component}: Readonly<TableRowProps>) {

    return (
        <TableRow>
            <TableCell><RepositoryTypeIcon type={component.type} /></TableCell>
            <TableCell>{component.purl}</TableCell>
            <TableCell>{component.namespace}</TableCell>
            <TableCell>{component.name}</TableCell>
            <TableCell>{component.version}</TableCell>
            <TableCell>{component.licenses.map(l => l.name).join(", ")}</TableCell>
        </TableRow>
    );
}
