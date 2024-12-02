import {MouseEventHandler} from "react";
import {Box, Button} from "@mui/material";
import {DeleteForever, Save} from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import * as React from "react";
import {useTranslation} from "react-i18next";
import {useAuth} from "../auth/useAuth.ts";

interface FormButtonSaveProps {
    labelLeftButton?: string;
    labelRightButton?: string;
    roleLeftButton?: string;
    roleRightButton?: string;
    startIcon?: React.ReactNode;
    onSaveClick?: MouseEventHandler;
    onDeleteClick?: MouseEventHandler;
}

/**
 *
 * @param labelLeftButton Default "Save"
 * @param labelRightButton Default "Delete"
 * @param startIcon Default "Save" icon
 * @param onLeftClick Optional. If not set, first button not visible
 * @param onRightClick Optional. If not set, the "delete" button not visible
 * @constructor
 */
export default function FormButtons({labelLeftButton, labelRightButton, startIcon, onSaveClick, onDeleteClick, roleLeftButton, roleRightButton}: Readonly<FormButtonSaveProps>) {

    const auth = useAuth();
    const { t } = useTranslation();

    const isVisible = (): boolean => {
        return (onSaveClick !== undefined && (roleLeftButton === undefined || auth.roles.includes(roleLeftButton)))
            || (onDeleteClick !== undefined && (roleRightButton === undefined || auth.roles.includes(roleRightButton)));
    }

    return (
        <>
            {isVisible() &&
            <Grid size={12} display="flex" flexDirection="row">
                {(roleLeftButton === undefined || auth.roles.includes(roleLeftButton)) && onSaveClick &&
                    <Button variant="contained"
                            onClick={onSaveClick}
                            size="small"
                            startIcon={startIcon ?? <Save />}>
                        {labelLeftButton ?? t("save")}
                    </Button>
                }

                <Box flexGrow={1} />

                {(roleRightButton === undefined || auth.roles.includes(roleRightButton)) && onDeleteClick &&
                    <Button variant="contained"
                            color="error"
                            onClick={onDeleteClick}
                            size="small"
                            startIcon={startIcon ?? <DeleteForever />}>
                        {labelRightButton ?? t("delete")}
                    </Button>
                }
            </Grid>
            }
        </>
    );

}
