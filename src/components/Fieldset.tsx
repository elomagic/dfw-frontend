"use client"

import * as React from "react";
import {Box, Typography, useColorScheme} from "@mui/material";

interface ComponentProps {
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

export const Fieldset = ({ label, children, ...props }: ComponentProps) => {

    const {mode} = useColorScheme();

    return (
        <Box component="fieldset" {...props}
             sx={{
                 borderColor: (mode == "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.23)"),
                 borderRadius: 1,
                 borderWidth: 1,
                 paddingTop: 0,
                 paddingBottom: 0,
                 margin: "-9px 0 0 0",
                 "&:hover": {
                     borderColor: (mode == "dark" ? "white" : "black")
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
                    color: (mode == "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)"),
                    fontSize: '0.75rem',
                }}>
                {label}
            </Typography>)}
            {children}
        </Box>
    );
};