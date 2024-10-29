import {Box} from "@mui/material";
import {useTranslation} from "react-i18next";

export default function AdminLicensesView() {

    const { t } = useTranslation();

    return (
        <Box margin={3}>
            {t("AdminLicensesView")}
        </Box>
    );
}
