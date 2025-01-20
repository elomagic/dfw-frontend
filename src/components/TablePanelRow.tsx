"use client"

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Collapse, useColorScheme} from "@mui/material";

interface ComponentProps {
    children: React.ReactNode;
    open: boolean;
    colSpan: number;
}

export const TablePanelRow = ({ children, open, colSpan }: ComponentProps) => {

    const {mode} = useColorScheme();

    return (
        <TableRow>
            <TableCell sx={{height: 0, bgcolor: (mode === "dark" ? "#292929" : 'grey.100') }} colSpan={colSpan}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    {children}
                </Collapse>
            </TableCell>
        </TableRow>
    );
};