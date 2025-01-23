"use client"

import {ProxyAudit} from "../../DTOs.ts";
import TableCell from "@mui/material/TableCell";
import { TableDataRow } from "../../components/TableDataRow.tsx";
import {Check} from "@mui/icons-material";
import {ImBlocked} from "react-icons/im";

interface ComponentProps {
    data: ProxyAudit;
}

export const ProxyAuditTableRow = ({ data }: Readonly<ComponentProps>) => {

    return (
        <TableDataRow>
            <TableCell>{data.permitted ? <Check color="success" /> : <ImBlocked color="error" />}</TableCell>
            <TableCell>{data.proxy.name}</TableCell>
            <TableCell>{data.component.purl}</TableCell>
        </TableDataRow>
    );

}
