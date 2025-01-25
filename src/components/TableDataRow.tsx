"use client"

import {ReactNode} from "react";
import TableRow from "@mui/material/TableRow";

interface ComponentProps {
    children: ReactNode;
    onClick?: () => void;
}

export const TableDataRow = ({ children, onClick, ...props }: ComponentProps) => {
    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            onClick={onClick}
            {...props}
        >
            {children}
        </TableRow>
    );
};