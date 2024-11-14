import {MouseEventHandler} from "react";
import {Box, Button} from "@mui/material";
import {DeleteForever, Save} from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import * as React from "react";
import {useTranslation} from "react-i18next";

interface FormButtonSaveProps {
    label?: string;
    startIcon?: React.ReactNode;
    onClick?: MouseEventHandler | undefined;
    onDeleteClick?: MouseEventHandler | undefined;
}

/**
 *
 * @param label Default "Save"
 * @param startIcon Default "Save" icon
 * @param onClick Optional. If not set, first button not visible
 * @param onDeleteClick Optional. If not set, the "delete" button not visible
 * @constructor
 */
export default function FormButton({label, startIcon, onClick, onDeleteClick}: Readonly<FormButtonSaveProps>) {

    const { t } = useTranslation();

    return (
        <Grid size={12} display="flex" flexDirection="row">
            {onClick &&
                <Button variant="contained"
                        onClick={onClick}
                        size="small"
                        startIcon={startIcon ?? <Save />}>
                    {label ?? t("save")}
                </Button>
            }

            <Box flexGrow={1} />

            {onDeleteClick &&
                <Button variant="contained"
                        color="error"
                        onClick={onDeleteClick}
                        size="small"
                        startIcon={startIcon ?? <DeleteForever />}>
                    {label ?? t("delete")}
                </Button>
            }
        </Grid>
    );

}
