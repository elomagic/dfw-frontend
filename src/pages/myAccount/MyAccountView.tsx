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

const fields: FormFieldValidationProperty[] = [
    { name : "displayName", minLength: 1 },
];

export default function MyAccountView() {

    const { t } = useTranslation();
    const auth = useAuth();

    const [mailAddress] = useState(auth.mailAddress);
    const [displayName, setDisplayName] = useState(auth.displayName);

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
            displayName: auth.displayName ?? "",
            // Following properties will be ignored by server
            enabled: false,
            changePassword: true,
        }

        Rest.patch(auth, RestEndpoint.UserSelf, data)
            .then(() => enqueueSnackbar(t("successful-saved"), { variant: 'success'} ))
            .catch((err) => enqueueSnackbar("Saving data failed: " + err, { variant: 'error'} ));
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
                    <FormButton label={t("save")} onClick={handleSaveClick}/>
                </Grid>
            </Card>
        </Box>
    );
}
