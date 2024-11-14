import {useState} from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useTranslation} from "react-i18next";
import * as Rest from "../../RestClient.ts"
import {RestEndpoint} from "../../RestClient.ts"
import {useAuth} from "../../auth/useAuth.ts";
import {AuthenticationMode, CredentialData} from "../../DTOs.ts";
import {enqueueSnackbar} from "notistack";
import {FormSelect} from "../../components/FormSelect.tsx";
import {validateInputs} from "../../FormFieldProperties.ts";
import FormTextField from "../../components/FormTextField.tsx";
import {FormFieldValidationProperty} from "../../components/FormBuilder.ts";


const fields: FormFieldValidationProperty[] = [
    { name : "credentialId", minLength: 1 },
];

interface CreateUserProps {
    open: boolean;
    handleClose: (created: boolean) => void;
}

export default function CreateCredentialDialog({ open, handleClose }: Readonly<CreateUserProps>) {

    const { t } = useTranslation();
    const auth = useAuth();
    const [credentialId, setCredentialId] = useState("");
    const [mode, setMode] = useState<AuthenticationMode>("BASIC");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passphrase, setPassphrase] = useState("");

    const [credentialIdErrorMessage, setCredentialIdErrorMessage] = useState<string|undefined>(undefined);

    const handleCreateClick = () => {
        if (validateInputs(fields, (fieldName, result) => {
            switch (fieldName) {
                case "credentialId": {
                    setCredentialIdErrorMessage(result);
                    break;
                }
            }
        })) {
            return;
        }

        const data: CredentialData = {
            credentialId,
            mode,
            username,
            password,
            passphrase
        }

        Rest
            .post(auth, RestEndpoint.Credential, data)
            .then(res => {
                if (res.status >= 400) {
                    return Promise.reject(new Error(res.statusText));
                }
                return res;
            })
            .then(() => handleClose(true))
            .then(() => enqueueSnackbar(t("successful-created"), { variant: 'success'} ))
            .catch((err: Error) => enqueueSnackbar("Creation failed: " + err.message, { variant: 'error'} ));
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{ sx: { backgroundImage: 'none' }}}
        >
            <DialogTitle>{t("create-credential")}</DialogTitle>
            <DialogContent
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
            >
                <DialogContentText>
                    Please enter credential details
                </DialogContentText>

                <FormTextField id="credentialId"
                                     value={credentialId}
                                     errorMessage={credentialIdErrorMessage}
                                     onChange={e => setCredentialId(e.target.value)}
                                     label={t("credentialId")}
                                     autoFocus
                                     required
                />

                <FormSelect id="mode"
                            value={mode}
                            label={t("mode")}
                            items={[
                                { "key": "BASIC", "label": "BASIC Authentication" },
                                { "key": "BEARER", "label": "BEARER Token" },
                            ]}
                            onChange={(e) => setMode(e.target.value as AuthenticationMode)}
                />

                {mode == "BASIC" && (
                    <>
                        <FormTextField id="username"
                                             value={username}
                                             onChange={e => setUsername(e.target.value)}
                                             label={t("username")}
                        />
                        <FormTextField id="name"
                                             value={password}
                                             type="password"
                                             onChange={e => setPassword(e.target.value)}
                                             label={t("password")}
                        />
                    </>
                )}
                {mode == "BEARER" && (
                    <FormTextField id="passphrase"
                                         value={password}
                                         type="passphrase"
                                         onChange={e => setPassphrase(e.target.value)}
                                         label={t("passphrase")}
                    />
                )}
            </DialogContent>
            <DialogActions sx={{ pb: 3, px: 3 }}>
                <Button onClick={() => handleClose(false)}>{t("cancel")}</Button>
                <Button variant="contained" onClick={handleCreateClick}>
                    {t("create")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}