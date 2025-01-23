"use client"

import {Component} from "../../DTOs.ts";
import TableCell from "@mui/material/TableCell";
import {TableDataRow} from "../../components/TableDataRow.tsx";
import {ProxyTypeIcon} from "../../components/ProxyTypeIcon.tsx";

interface ComponentProps {
    component: Component;
}

export default function ComponentTableRow({component}: Readonly<ComponentProps>) {

    return (
        <TableDataRow>
            <TableCell><ProxyTypeIcon type={component.type} /></TableCell>
            <TableCell>{component.purl}</TableCell>
            <TableCell>{component.namespace}</TableCell>
            <TableCell>{component.name}</TableCell>
            <TableCell>{component.version}</TableCell>
            <TableCell>{component.licenses.map(l => l.name).join(", ")}</TableCell>
        </TableDataRow>
    );
}
