import {MouseEventHandler} from "react";
import {Button} from "@mui/material";
import {Save} from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import * as React from "react";
import {useTranslation} from "react-i18next";

interface FormButtonSaveProps {
    label?: string;
    onClick: MouseEventHandler | undefined;
    startIcon?: React.ReactNode;
}

/**
 *
 * @param label Default "Save"
 * @param onClick
 * @param startIcon Default "Save" icon
 * @constructor
 */
export default function FormButton({ label, onClick, startIcon}: Readonly<FormButtonSaveProps>) {

    const { t } = useTranslation();

    return (
        <Grid size={12}>
            <Button variant="contained"
                    onClick={onClick}
                    size="small"
                    startIcon={startIcon ?? <Save />}>
                {label ?? t("save")}
            </Button>
        </Grid>
    );

}
