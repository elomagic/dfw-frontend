import {useTranslation} from "react-i18next";
import {useState} from "react";
import Grid from "@mui/material/Grid2";
import {validateInputs} from "../../../FormFieldProperties.ts";
import * as Rest from "../../../RestClient.ts";
import {RestEndpoint} from "../../../RestClient.ts";
import {useAuth} from "../../../auth/useAuth.ts";
import {UserAccount} from "../../../DTOs.ts";
import {enqueueSnackbar} from "notistack";
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
    onDeleteRequest: () => void
}

export default function EditableTableRow({ user, onDeleteRequest }: Readonly<EditableTableRowProps>) {

    const { t } = useTranslation();
    const auth = useAuth();

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

        const data: UserAccount = {
            mailAddress: user.mailAddress,
            displayName,
            language,
            enabled,
            changePassword
        }

        Rest.patch(auth, RestEndpoint.User, data)
            .then(() => enqueueSnackbar(t("successful-saved"), { variant: 'success'} ))
            .catch((err: Error) => enqueueSnackbar("Saving data failed: " + err.message, { variant: 'error'} ));
    };

    return (
        <Grid container spacing={2} margin={2}>
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

            <FormSelect id="mode"
                        value={language ?? "EN"}
                        label={t("mode")}
                        items={[
                            { "key": "EN", "label": t("english") },
                            { "key": "DE", "label": t("german") },
                        ]}
                        onChange={(e) => setLanguage(e.target.value as string)}
            />

            <FormButton onClick={handleSaveClick} onDeleteClick={onDeleteRequest}/>
        </Grid>
    );
}
