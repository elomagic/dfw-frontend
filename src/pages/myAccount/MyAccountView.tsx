import {Box, Card, FormControl, FormLabel, TextField} from "@mui/material";
import {useAuth} from "../../auth/useAuth.ts";
import {useTranslation} from "react-i18next";

export default function MyAccountView() {

    const { t } = useTranslation();
    const auth = useAuth();

    return (
        <Box margin={3}>
            <Card>
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
                    />
                </FormControl>
            </Card>
        </Box>
    );
}
