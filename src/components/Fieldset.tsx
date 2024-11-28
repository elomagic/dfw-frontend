import * as React from "react";
import {Box, Typography} from "@mui/material";

interface FieldsetProps {
    label?: string;
    children: React.ReactNode;
}

export const Fieldset = ({ label, children, ...props }: FieldsetProps) => {
    return (
        <Box component="fieldset" {...props}
             sx={{
                 borderColor: "rgba(255, 255, 255, 0.7)",
                 borderRadius: 1,
                 borderWidth: 1,
                 margin: 0
             }}
        >
            {label && (<Typography
                component="legend"
                sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: '0.75rem',
                }}>
                {label}
            </Typography>)}
            {children}
        </Box>
    );
};