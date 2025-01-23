"use client"

import {Box, Card, Paper} from "@mui/material";
import {useTranslation} from "react-i18next";

export const ChangePasswortView = () => {

    const { t } = useTranslation();

    return (
        <Box margin={3}>
            <Card>
                <Paper>
                    {t("changepassword")}
                </Paper>
            </Card>
        </Box>
    );
}
