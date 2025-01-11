import * as React from "react";
import {Box, Typography} from "@mui/material";

interface FieldsetProps {
    label?: string;
    children: React.ReactNode;
}

/**
 * Gives for component, string what ever, a smart border with a border label.
 *
 * @param label Label of the border
 * @param children Components children's
 * @param props Any other props
 */

export const Fieldset = ({ label, children, ...props }: FieldsetProps) => {
    return (
        <Box component="fieldset" {...props}
             sx={{
                 borderColor: "rgba(255, 255, 255, 0.3)",
                 borderRadius: 1,
                 borderWidth: 1,
                 paddingTop: 0,
                 paddingBottom: 0,
                 margin: "-9px 0 0 0",
                 "&:hover": {
                     borderColor: "white"
                 },
                 "&:focus-within": {
                     borderColor: "#90caf9",
                     borderWidth: 2,
                 }
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