import {Box} from "@mui/material";
import {useTranslation} from "react-i18next";

export default function AdminVulnerabilitiesView() {

    const { t } = useTranslation();

    return (
        <Box margin={3}>
            {t("AdminVulnerabilitiesView")}
        </Box>
    );
}
