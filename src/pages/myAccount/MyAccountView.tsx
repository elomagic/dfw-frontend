import {Box, Card} from "@mui/material";
import {useAuth} from "../../auth/useAuth.ts";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import * as Rest from "../../RestClient.ts";
import {RestEndpoint} from "../../RestClient.ts";
import Grid from "@mui/material/Grid2";
import {validateInputs} from "../../FormFieldProperties.ts";
import {UserAccount} from "../../DTOs.ts";
import {enqueueSnackbar} from "notistack";
import FormButton from "../../components/FormButton.tsx";
import FormTextField from "../../components/FormTextField.tsx";
import {FormFieldValidationProperty} from "../../components/FormBuilder.ts";
import {FormSelect} from "../../components/FormSelect.tsx";

const fields: FormFieldValidationProperty[] = [
    { name : "displayName", minLength: 1 },
];

export default function MyAccountView() {

    const { t } = useTranslation();
    const auth = useAuth();

    const [mailAddress] = useState(auth.mailAddress);
    const [displayName, setDisplayName] = useState(auth.displayName);
    const [language, setLanguage] = useState(auth.displayName);

    const [displayNameErrorMessage, setDisplayNameErrorMessage] = useState<string|undefined>('');

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
            mailAddress: auth.mailAddress ?? "",
            displayName: displayName ?? "",
            language: language ?? "EN",
            // Following properties will be ignored by server
            enabled: false,
            changePassword: true,
        }

        Rest.patch(auth, RestEndpoint.UserSelf, data)
            .then(() => enqueueSnackbar(t("successful-saved"), { variant: 'success'} ))
            .catch((err: Error) => enqueueSnackbar("Saving data failed: " + err.message, { variant: 'error'} ));
    };

    return (
        <Box margin={3}>
            <Card>
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

                    <FormSelect id="mode"
                                value={language ?? "EN"}
                                label={t("mode")}
                                items={[
                                    { "key": "EN", "label": t("english") },
                                    { "key": "DE", "label": t("german") },
                                ]}
                                onChange={(e) => setLanguage(e.target.value as string)}
                    />

                    <FormButton onClick={handleSaveClick}/>
                </Grid>
            </Card>
        </Box>
    );
}
