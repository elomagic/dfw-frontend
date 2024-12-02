import {Configuration, ConfigurationKeyMeta} from "../../DTOs.ts";
import {useState} from "react";
import Grid from "@mui/material/Grid2";
import FormButtons from "../../components/FormButtons.tsx";
import FormTextField from "../../components/FormTextField.tsx";
import {useTranslation} from "react-i18next";

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

    return (
        <Grid container spacing={2} marginTop={2} marginBottom={2}>
            <FormTextField id="key"
                           value={value}
                           type={!keyMeta || !keyMeta.secret ? "text" : "password"}
                           onChange={e => {
                               setValue(e.target.value);
                           }}
                           label={key}
                           autoFocus
                           gridSize={12}
            />

            <FormButtons labelRightButton={t("reset")}
                         onSaveClick={() => onSaveClick({key, value})}
                         onDeleteClick={onResetRequest}/>
        </Grid>
    );
}
