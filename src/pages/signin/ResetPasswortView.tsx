"use client"

import {Box, Button, FormControl, FormLabel, Stack, styled, TextField, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {FormEvent, useEffect, useState} from "react";
import * as Rest from "../../RestClient.ts";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useAuth} from "@/auth/useAuth.ts";
import MuiCard from "@mui/material/Card";

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

const ResetPasswordContainer = styled(Stack)(({ theme }) => ({
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

export const ResetPasswortView = () => {

    const { t } = useTranslation();
    const auth = useAuth();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [emailErrorMessage, setEmailErrorMessage] = useState<string|undefined>(undefined);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string|undefined>(undefined);
    const [token, setToken] = useState<string>('');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (emailErrorMessage || passwordErrorMessage) {
            return;
        }

        const data = new FormData(event.currentTarget);

        Rest.postForm(auth, Rest.Endpoint.UserResetPassword, data)
            .then(() => {
                navigate("/");
            })
            .catch((reason) => {
                console.error(reason);
                setPasswordErrorMessage(t("dialog.reset-password.reset.error"));
            });
    };

    const validateInputs = () => {
        const email = document.getElementById('mailAddress') as HTMLInputElement;
        const password = document.getElementById('newPassword') as HTMLInputElement;
        const passwordValidation = document.getElementById('validatePassword') as HTMLInputElement;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailErrorMessage(t("dialog.reset-password.validation.error1"));
        } else {
            setEmailErrorMessage(undefined);
        }

        if ((!password.value || password.value.length < 6) && (!passwordValidation.value || passwordValidation.value.length < 6)) {
            setPasswordErrorMessage(t("dialog.reset-password.validation.error2"));
        } else if (password !== passwordValidation) {
            setPasswordErrorMessage(t("dialog.reset-password.validation.error3"));
        } else {
            setPasswordErrorMessage(undefined);
        }

    };

    useEffect(() => setToken(searchParams.get("token") ?? ""), [searchParams]);

    return (
        <ResetPasswordContainer direction="column" justifyContent="space-between">
            <Card variant="outlined">

                <Typography
                    component="span"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'unset' }}
                >
                    {t("app.title")}
                </Typography>

                <Typography
                    component="span"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                >
                    {t("reset-password")}
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
                    <input
                        type="hidden"
                        id="resetToken"
                        name="resetToken"
                        defaultValue={token}
                    />

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
                            color={emailErrorMessage ? 'primary' : 'error'}
                            sx={{ ariaLabel: 'mailAddress' }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="newPassword">{t("password")}</FormLabel>
                        <TextField
                            error={passwordErrorMessage !== undefined}
                            helperText={passwordErrorMessage}
                            name="newPassword"
                            placeholder="••••••"
                            type="password"
                            id="newPassword"
                            autoComplete="current-password"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            color={passwordErrorMessage ? 'primary' : 'error'}
                            sx={{ ariaLabel: 'password' }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="validatePassword">{t("password-validation")}</FormLabel>
                        <TextField
                            error={passwordErrorMessage !== undefined}
                            helperText={passwordErrorMessage}
                            name="validatePassword"
                            placeholder="••••••"
                            type="password"
                            id="validatePassword"
                            autoComplete="current-password"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            color={passwordErrorMessage ? 'primary' : 'error'}
                            sx={{ ariaLabel: 'password' }}
                        />
                    </FormControl>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={validateInputs}
                    >
                        {t("reset-password")}
                    </Button>
                </Box>
            </Card>
        </ResetPasswordContainer>
    );
}
