import {useTranslation} from "react-i18next";
import {useState} from "react";
import {Button} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {FormFieldProperty, validateInputs} from "../../../FormFieldProperties.ts";
import FormFieldComponents, {FormCheckbox} from "../../../components/FormFieldComponents.tsx";
import * as Rest from "../../../RestClient.ts";
import {RestEndpoint} from "../../../RestClient.ts";
import {useAuth} from "../../../auth/useAuth.ts";
import {UserAccount} from "../../../DTOs.ts";

const fields: FormFieldProperty[] = [
    { name : "displayName", minLength: 1 },
];

interface EditableTableRowProps {
    user: UserAccount
}

export default function EditableTableRow({ user }: Readonly<EditableTableRowProps>) {

    const { t } = useTranslation();
    const auth = useAuth();

    const [mailAddress] = useState(user.mailAddress);
    const [displayName, setDisplayName] = useState(user.displayName);
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
            enabled,
            changePassword
        }

        Rest.patch(auth, RestEndpoint.User, data)
            .then(() => {
                // navigate("/");
            })
            .catch((reason) => {
                console.error(reason);
                // setPasswordError(true);
                // setPasswordErrorMessage('Somme went wrong during password reset.');
            });
    };

    return (
        <Grid container spacing={2} margin={2} onSubmit={handleSaveClick}>
            <FormFieldComponents id="mailAddress"
                                 value={mailAddress}
                                 label={t("mailAddress")}
                                 gridSize={6}
            />
            <FormFieldComponents id="displayName"
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

            <Grid size={12}>
                <Button
                    variant="contained"
                    onClick={handleSaveClick}
                >
                    {t("save")}
                </Button>
            </Grid>
        </Grid>
    );
}
