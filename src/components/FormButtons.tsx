import {MouseEventHandler} from "react";
import {Box, Button} from "@mui/material";
import {DeleteForever, Save} from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import * as React from "react";
import {useTranslation} from "react-i18next";
import {useAuth} from "../auth/useAuth.ts";

interface FormButtonSaveProps {
    label?: string;
    startIcon?: React.ReactNode;
    onSaveClick?: MouseEventHandler;
    onDeleteClick?: MouseEventHandler;
    updateRole?: string;
    deleteRole?: string;
}

/**
 *
 * @param label Default "Save"
 * @param startIcon Default "Save" icon
 * @param onClick Optional. If not set, first button not visible
 * @param onDeleteClick Optional. If not set, the "delete" button not visible
 * @constructor
 */
export default function FormButtons({label, startIcon, onSaveClick, onDeleteClick, updateRole, deleteRole}: Readonly<FormButtonSaveProps>) {

    const auth = useAuth();
    const { t } = useTranslation();

    return (
        <Grid size={12} display="flex" flexDirection="row">
            {(updateRole === undefined || auth.roles.includes(updateRole)) && onSaveClick &&
                <Button variant="contained"
                        onClick={onSaveClick}
                        size="small"
                        startIcon={startIcon ?? <Save />}>
                    {label ?? t("save")}
                </Button>
            }

            <Box flexGrow={1} />

            {(deleteRole === undefined || auth.roles.includes(deleteRole)) && onDeleteClick &&
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
