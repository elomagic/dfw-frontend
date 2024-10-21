import { useTranslation } from 'react-i18next';
import {Link as RouterLink} from "react-router-dom";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import {createTheme} from "@mui/material/styles";

export default function CopyrightFooter() {

    const { t } = useTranslation();
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
                <Link style={itemStyles} variant="body2" component={RouterLink} to="/dsgvo">{t("privacy-policy")}</Link>
                <span style={itemStyles}>&nbsp;&bull;&nbsp;</span>
                <Link style={itemStyles} variant="body2" component={RouterLink} to="/imprint">{t("imprint")}</Link>
                <span style={itemStyles}>&nbsp;&bull;&nbsp;</span>
                <span style={itemStyles}>{"Copyright © elomagic " + new Date().getFullYear()}</span>
            </Typography>
        </Container>
    );
}
