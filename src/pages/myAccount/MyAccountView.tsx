import {Box, Button, Card, FormControl, FormLabel, TextField} from "@mui/material";
import {useAuth} from "../../auth/useAuth.ts";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import * as Rest from "../../RestClient.ts";
import {RestEndpoint} from "../../RestClient.ts";

export default function MyAccountView() {

    const { t } = useTranslation();
    const auth = useAuth();
    const [displayNameError, setDisplayNameError] = useState(false);
    const [displayNameErrorMessage, setDisplayNameErrorMessage] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (displayNameError) {
            return;
        }

        const data = new FormData(event.currentTarget);

        Rest.post(auth, RestEndpoint.UserSelf, data)
            .catch((reason) => {
                console.error(reason);
                setDisplayNameError(true);
                setDisplayNameErrorMessage('Something went wrong during saving your data.');
            });
    };

    const validateInputs = () => {
        const displayName = document.getElementById('displayName') as HTMLInputElement;

        if (displayName.value.length === 0) {
            setDisplayNameError(true);
            setDisplayNameErrorMessage('Please enter a display name');
        } else {
            setDisplayNameError(false);
            setDisplayNameErrorMessage('');
        }
    };

    return (
        <Box margin={3}>
            <Card>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 2,
                    }}
                >
                    <FormControl>
                        <FormLabel htmlFor="mailAddress">{t("mailAddress")}</FormLabel>
                        <TextField
                            id="mailAddress"
                            defaultValue={auth.mailAddress}
                            type="email"
                            name="mailAddress"
                            fullWidth
                            variant="outlined"
                            sx={{ ariaLabel: 'mailAddress' }}
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                            }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="displayName">{t("displayName")}</FormLabel>
                        <TextField
                            error={displayNameError}
                            helperText={displayNameErrorMessage}
                            id="displayName"
                            type="text"
                            name="displayName"
                            placeholder="Johnny Doe"
                            autoComplete="displayName"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            color={displayNameError ? 'error' : 'primary'}
                            sx={{ ariaLabel: 'mailAddress' }}
                        />
                    </FormControl>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={validateInputs}
                    >
                        {t("save")}
                    </Button>
                </Box>
            </Card>
        </Box>
    );
}
