"use client"

import {useState} from "react";
import {useTranslation} from "react-i18next";
import Grid from "@mui/material/Grid2";
import {Role} from "@/auth/Role.ts";
import {Configuration, ConfigurationKeyMeta} from "@/DTOs.ts";
import {FormCheckbox} from "@components/FormCheckBox.tsx";
import { FormTextField } from "@components/FormTextField.tsx";
import {FormButtons} from "@components/FormButtons.tsx";

interface ComponentProps {
    configuration: Configuration;
    keyMeta: ConfigurationKeyMeta | undefined;
    onSaveClick: (data: Configuration) => void;
    onResetRequest: () => void;
}

export const EditableTableRow = ({ configuration, keyMeta, onSaveClick, onResetRequest }: Readonly<ComponentProps>) => {

    const { t } = useTranslation();

    const [key] = useState(configuration.key);
    const [value, setValue] = useState(configuration.value);

    const getType = () => {
        if (keyMeta && keyMeta.dataType === "INTEGER") {
            return "number";
        }

        return !keyMeta || keyMeta.secret ? "password" : "text";
    }

    return (
        <Grid container spacing={2} marginTop={2} marginBottom={2}>
            {keyMeta && keyMeta.dataType === "BOOLEAN" && (
                <FormCheckbox id={key}
                              value={value === "true"}
                              label={key.split("_")[key.split("_").length-1]}
                              gridSize={12}
                              onChange={(c) => setValue(c ? "true" : "false")}
                />
            )}
            {keyMeta && keyMeta.dataType !== "BOOLEAN" && (
                <FormTextField id={key}
                               value={value} type={getType()}
                               label={key.split("_")[key.split("_").length-1]}
                               autoFocus
                               gridSize={12}
                               onChange={setValue}
                />
            )}

            <FormButtons labelRightButton={t("reset")}
                         roleRightButton={Role.CONFIGURATION_UPDATE}
                         onSaveClick={() => onSaveClick({key, value})}
                         onDeleteClick={onResetRequest}/>
        </Grid>
    );
}
