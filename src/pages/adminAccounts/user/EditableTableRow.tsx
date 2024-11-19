import {useTranslation} from "react-i18next";
import {useState} from "react";
import Grid from "@mui/material/Grid2";
import {validateInputs} from "../../../FormFieldProperties.ts";
import {UserAccount} from "../../../DTOs.ts";
import FormButton from "../../../components/FormButton.tsx";
import FormTextField from "../../../components/FormTextField.tsx";
import {FormCheckbox} from "../../../components/FormCheckBox.tsx";
import {FormFieldValidationProperty} from "../../../components/FormBuilder.ts";
import {FormSelect} from "../../../components/FormSelect.tsx";

const fields: FormFieldValidationProperty[] = [
    { name : "displayName", minLength: 1 },
];

interface EditableTableRowProps {
    user: UserAccount
    onSaveClick: (data: UserAccount) => void;
    onDeleteRequest: () => void
}

export default function EditableTableRow({ user, onSaveClick, onDeleteRequest }: Readonly<EditableTableRowProps>) {

    const { t } = useTranslation();

    const [mailAddress] = useState(user.mailAddress);
    const [displayName, setDisplayName] = useState(user.displayName);
    const [language, setLanguage] = useState(user.language);
    const [enabled, setEnabled] = useState(user.enabled);
    const [changePassword, setChangePassword] = useState(user.changePassword);

    const [displayNameErrorMessage, setDisplayNameErrorMessage] = useState<string|undefined>(undefined);

    const handleSaveClick = () => {
        if (validateInputs(fields, (fieldName, result) => {
            switch (fieldName) {
                case "displayName": {
                    setDisplayNameErrorMessage(result);
                    break;
                }
            }
        })) {
            return;
        }

        onSaveClick({id: user.id, mailAddress, displayName, language, enabled, changePassword});
    };

    return (
        <Grid container spacing={2} marginTop={2} marginBottom={2}>
            <FormTextField id="mailAddress"
                                 value={mailAddress}
                                 label={t("mailAddress")}
                                 gridSize={6}
            />
            <FormTextField id="displayName"
                                 value={displayName}
                                 errorMessage={displayNameErrorMessage}
                                 onChange={e => setDisplayName(e.target.value)}
                                 label={t("displayName")}
                                 autoFocus
                                 required
                                 gridSize={6}
            />

            <FormCheckbox id="enabled"
                          value={enabled}
                          label={t("enabled")}
                          onChange={e => setEnabled(e.target.checked)}
                          gridSize={6}
            />
            <FormCheckbox id="changePassword"
                          value={changePassword}
                          label={t("changePassword")}
                          onChange={e => setChangePassword(e.target.checked)}
                          gridSize={6}
            />

            <FormSelect id="language"
                        value={language ?? "EN"}
                        label={t("language")}
                        items={[
                            { "key": "EN", "label": t("english") },
                            { "key": "DE", "label": t("german") },
                        ]}
                        onChange={(e) => setLanguage(e.target.value as string)}
                        gridSize={6}
            />

            <FormButton onSaveClick={handleSaveClick} onDeleteClick={onDeleteRequest}/>
        </Grid>
    );
}
