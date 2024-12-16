import {FormEvent, useState} from "react";
import ForgotPasswordDialog from "./ForgotPasswordDialog.tsx";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../auth/useAuth.ts";
import {toaster} from "../../Toaster.ts";
import {Button} from "../../components/ui/button.tsx";
import {Label} from "../../components/ui/label.tsx";
import { Input } from "../../components/ui/input.tsx";
import {FormItem} from "../../components/FormItem.tsx";
import {Card} from "../../components/ui/card.tsx";

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
*/

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
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '100%',
            height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
            // backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
            backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
            backgroundRepeat: 'no-repeat',
        }}>
            <Card className="w-[350px]" style={{
                display: 'flex',
                flexDirection: 'column',
                alignSelf: 'center',
                width: '100%',
                margin: 'auto',
                maxWidth: '450px',
                padding: '1rem',
                gap: '1rem',
                boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
            }}>
                <h2 className="text-2xl">{t("app.title")}</h2>

                <h1 className="text-3xl">{t("sign-in")}</h1>

                <form onSubmit={handleSubmit}>
                    <FormItem htmlFor="email" errorMessage={emailErrorMessage} label={t("email")}>
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
                    </FormItem>

                    <div className="grid gap-2">
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Label htmlFor="password">{t("password")}</Label>
                            <Button variant="link" onClick={handleClickOpen}>
                                Forgot your password?
                            </Button>
                        </div>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••"
                            autoComplete="current-password"
                            required
                            color={passwordErrorMessage === undefined ? 'primary' : 'error'}
                            style={{width: "100%"}}
                        />
                    </div>

                    <ForgotPasswordDialog open={open} handleClose={handleClose}/>

                    <Button
                        type="submit"
                        style={{width: "100%"}}
                        onClick={validateInputs}
                    >
                        {t("sign-in")}
                    </Button>
                </form>
            </Card>
        </div>
    );
}