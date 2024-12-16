import { useTranslation } from 'react-i18next';
import {Link} from "react-router-dom";

export default function CopyrightFooter() {

    const { t } = useTranslation();

    const itemStyles = {
        margin: "auto",
        color: "inherit",
        fontSize: "0.8125rem",
    }

    return (
        <div style={{ paddingTop: 2, textAlign: "center", margin: "auto", width: "auto" }}>
            <Link style={itemStyles} to="/dsgvo">{t("privacy-policy")}</Link>
            <span style={itemStyles}>&nbsp;&bull;&nbsp;</span>
            <Link style={itemStyles} to="/imprint">{t("imprint")}</Link>
            <span style={itemStyles}>&nbsp;&bull;&nbsp;</span>
            <span style={itemStyles}>{"Copyright © elomagic " + new Date().getFullYear()}</span>
        </div>
    );
}
