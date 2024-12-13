import {FormEvent, useState} from "react";
import {Box, Button, FormControl, FormLabel, Stack, styled, TextField, Typography} from "@mui/material";
// import { useNavigate } from "react-router-dom"
import MuiCard from '@mui/material/Card';
import Link from "@mui/material/Link";
import ForgotPasswordDialog from "./ForgotPasswordDialog.tsx";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../auth/useAuth.ts";
import {toaster} from "../../Toaster.ts";

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

export default function SignInView() {

    const { t } = useTranslation();
    const auth = useAuth();
    const [emailErrorMessage, setEmailErrorMessage] = useState<string|undefined>(undefined);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string|undefined>(undefined);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (emailErrorMessage || passwordErrorMessage) {
            return;
        }

        const data = new FormData(event.currentTarget);

        auth.signinRedirect(data)
            .catch((err: Error) => toaster(t("login-failed", { message: err.message }), 'error'));
    };

    const validateInputs = () => {
        const email = document.getElementById('mailAddress') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailErrorMessage(t("dialog.signin.validation.error1"));
        } else {
            setEmailErrorMessage(undefined);
        }

        if (!password.value || password.value.length < 6) {
            setPasswordErrorMessage(t("dialog.signin.validation.error2"));
        } else {
            setPasswordErrorMessage(undefined);
        }
    };

    return (
        <SignInContainer direction="column" justifyContent="space-between">
            <Card variant="outlined">

                <Typography
                    component="h2"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'unset' }}
                >
                    {t("app.title")}
                </Typography>

                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                >
                    {t("sign-in")}
                </Typography>

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
                        <FormLabel htmlFor="mailAddress">{t("email")}</FormLabel>
                        <TextField
                            error={emailErrorMessage !== undefined}
                            helperText={emailErrorMessage}
                            id="mailAddress"
                            type="email"
                            name="mailAddress"
                            placeholder="your@email.com"
                            autoComplete="email"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            color={emailErrorMessage === undefined ? 'primary' : 'error'}
                            sx={{ ariaLabel: 'mailAddress' }}
                        />
                    </FormControl>

                    <FormControl>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <FormLabel htmlFor="password">{t("password")}</FormLabel>
                            <Link
                                component="button"
                                type="button"
                                onClick={handleClickOpen}
                                variant="body2"
                                sx={{ alignSelf: 'baseline' }}
                            >
                                Forgot your password?
                            </Link>
                        </Box>
                        <TextField
                            error={passwordErrorMessage !== undefined}
                            helperText={passwordErrorMessage}
                            name="password"
                            placeholder="••••••"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            color={passwordErrorMessage === undefined ? 'primary' : 'error'}
                        />
                    </FormControl>

                    <ForgotPasswordDialog open={open} handleClose={handleClose} />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={validateInputs}
                    >
                        {t("sign-in")}
                    </Button>
                </Box>
            </Card>
        </SignInContainer>
    );
}