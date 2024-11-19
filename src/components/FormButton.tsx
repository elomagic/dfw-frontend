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
    onClick?: MouseEventHandler | undefined;
    onDeleteClick?: MouseEventHandler | undefined;
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
export default function FormButton({label, startIcon, onClick, onDeleteClick, updateRole, deleteRole}: Readonly<FormButtonSaveProps>) {

    const auth = useAuth();
    const { t } = useTranslation();

    return (
        <Grid size={12} display="flex" flexDirection="row">
            {(updateRole === undefined || auth.roles.includes(updateRole)) && onClick &&
                <Button variant="contained"
                        onClick={onClick}
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
