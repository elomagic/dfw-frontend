import {useTranslation} from "react-i18next";
import {FormEvent, useEffect, useState} from "react";
import * as Rest from "../../RestClient.ts";
import {RestEndpoint} from "../../RestClient.ts";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useAuth} from "../../auth/useAuth.ts";
import {Button} from "../../components/ui/button.tsx";
import {Input} from "../../components/ui/input.tsx";
import {Label} from "../../components/ui/label.tsx";

/*
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
*/
export default function ResetPasswortView() {

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

        Rest.postFormData(auth, RestEndpoint.UserResetPassword, data)
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

    useEffect(() => {
        setToken(searchParams.get("token") ?? "");
    }, [searchParams]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <div>

                <h2>{t("app.title")}</h2>

                <h1>{t("reset-password")}</h1>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        <Input
                            type="hidden"
                            id="resetToken"
                            name="resetToken"
                            defaultValue={token}
                        />

                        <div className="grid gap-2">
                            <Label htmlFor="mailAddress">{t("email")}</Label>
                            <Input
                                id="mailAddress"
                                name="mailAddress"
                                type="email"
                                placeholder="your@email.com"
                                autoComplete="email"
                                autoFocus
                                required
                                color={emailErrorMessage === undefined ? 'primary' : 'error'}
                                style={{width: "100%"}}
                            />
                            {emailErrorMessage && <span className="text-red-500">{emailErrorMessage}</span>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="newPassword">{t("password")}</Label>
                            <Input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                placeholder="••••••"
                                autoComplete="current-password"
                                required
                                color={passwordErrorMessage === undefined ? 'primary' : 'error'}
                                style={{width: "100%"}}
                            />
                            {passwordErrorMessage && <span className="text-red-500">{passwordErrorMessage}</span>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="validatePassword">{t("password-validation")}</Label>
                            <Input
                                id="validatePassword"
                                name="validatePassword"
                                type="password"
                                placeholder="••••••"
                                autoComplete="current-password"
                                required
                                color={passwordErrorMessage === undefined ? 'primary' : 'error'}
                                style={{width: "100%"}}
                            />
                            {passwordErrorMessage && <span className="text-red-500">{passwordErrorMessage}</span>}
                        </div>

                        <Button type="submit" style={{width: "100%"}} onClick={validateInputs}>
                            {t("reset-password")}
                        </Button>
                    </div>
                </form>

            </div>
        </div>
    );
}
