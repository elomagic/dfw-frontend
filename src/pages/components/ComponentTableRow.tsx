"use client"

import {Component} from "../../DTOs.ts";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import ProxyTypeIcon from "../../components/ProxyTypeIcon.tsx";

interface ComponentProps {
    component: Component;
}

export default function ComponentTableRow({component}: Readonly<ComponentProps>) {

    return (
        <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}, backgroundColor: "#292929"}}>
            <TableCell><ProxyTypeIcon type={component.type} /></TableCell>
            <TableCell>{component.purl}</TableCell>
            <TableCell>{component.namespace}</TableCell>
            <TableCell>{component.name}</TableCell>
            <TableCell>{component.version}</TableCell>
            <TableCell>{component.licenses.map(l => l.name).join(", ")}</TableCell>
        </TableRow>
    );
}
