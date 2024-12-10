import {Configuration, ConfigurationKeyMeta} from "../../DTOs.ts";
import {useState} from "react";
import Grid from "@mui/material/Grid2";
import FormButtons from "../../components/FormButtons.tsx";
import FormTextField from "../../components/FormTextField.tsx";
import {useTranslation} from "react-i18next";
import {Role} from "../../auth/Auth.tsx";
import {FormCheckbox} from "../../components/FormCheckBox.tsx";

interface EditableTableRowProps {
    configuration: Configuration;
    keyMeta: ConfigurationKeyMeta | undefined;
    onSaveClick: (data: Configuration) => void;
    onResetRequest: () => void;
}

export default function EditableTableRow({ configuration, keyMeta, onSaveClick, onResetRequest }: Readonly<EditableTableRowProps>) {

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
                              onChange={(e) => setValue(e.target.checked ? "true" : "false")}
                />
            )}
            {keyMeta && keyMeta.dataType !== "BOOLEAN" && (
                <FormTextField id={key}
                               value={value} type={getType()}
                               label={key.split("_")[key.split("_").length-1]}
                               autoFocus
                               gridSize={12}
                               onChange={e => setValue(e.target.value)}
                />
            )}

            <FormButtons labelRightButton={t("reset")}
                         roleRightButton={Role.CONFIGURATION_UPDATE}
                         onSaveClick={() => onSaveClick({key, value})}
                         onDeleteClick={onResetRequest}/>
        </Grid>
    );
}
