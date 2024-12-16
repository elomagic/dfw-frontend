import {MouseEventHandler} from "react";
import * as React from "react";
import {useTranslation} from "react-i18next";
import {useAuth} from "../auth/useAuth.ts";
import {Button} from "../components/ui/button.tsx";
import {MdDeleteForever} from "react-icons/md";
import {FaSave} from "react-icons/fa";
import {GridItem} from "../components/Grids.tsx";

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
            <GridItem size={12} style={{ display: "flex", flexDirection: "row"}}>
                {(roleLeftButton === undefined || auth.roles.includes(roleLeftButton)) && onSaveClick &&
                    <Button onClick={onSaveClick} size="sm">
                        {startIcon ?? <FaSave/>}{labelLeftButton ?? t("save")}
                    </Button>
                }

                <div style={{ flexGrow: 1 }} />

                {(roleRightButton === undefined || auth.roles.includes(roleRightButton)) && onDeleteClick &&
                    <Button color="error" onClick={onDeleteClick} size="sm">
                        <MdDeleteForever/> {labelRightButton ?? t("delete")}
                    </Button>
                }
            </GridItem>
            }
        </>
    );

}
