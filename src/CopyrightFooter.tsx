"use client"

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {createTheme} from "@mui/material/styles";

export const CopyrightFooter = () => {

    const theme = createTheme();

    const styles = {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        display: "inline-flex",
        borderRadius: "16px",
        height: "24px",
        paddingLeft: "8px",
        paddingRight: "8px",
    }

    const itemStyles = {
        margin: "auto",
        color: "inherit",
        fontSize: "0.8125rem",
    }

    return (
        <Container sx={{ pt: 2, textAlign: "center", m: "auto", w: "auto" }}>
            <Typography style={styles} variant="body2">
                <span style={itemStyles}>{"Copyright © elomagic " + new Date().getFullYear()}</span>
            </Typography>
        </Container>
    );
}
