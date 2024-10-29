import {Box} from "@mui/material";
import {useTranslation} from "react-i18next";

export default function DashboardView() {

    const { t } = useTranslation();

    return (
        <Box margin={3}>
            {t("dashboard")}
        </Box>
    );
}
