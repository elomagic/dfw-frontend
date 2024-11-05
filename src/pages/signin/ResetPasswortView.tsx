import {Box, Card, Paper} from "@mui/material";
import {useTranslation} from "react-i18next";

export default function ResetPasswortView() {

    const { t } = useTranslation();

    return (
        <Box margin={3}>
            <Card>
                <Paper>
                    {t("ResetPasswortView")}
                </Paper>
            </Card>
        </Box>
    );
}