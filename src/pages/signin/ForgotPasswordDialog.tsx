import * as React from 'react';
import {useTranslation} from "react-i18next";
import * as Rest from "../../RestClient.ts"
import {RestEndpoint} from "../../RestClient.ts"
import {useAuth} from "../../auth/useAuth.ts";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '../../components/ui/dialog.tsx';
import {Button} from "../../components/ui/button.tsx";
import {Input} from "../../components/ui/input.tsx";
import {Label} from "../../components/ui/label.tsx";

interface ForgotPasswordProps {
    open: boolean;
    handleClose: () => void;
}

export default function ForgotPasswordDialog({ open, handleClose }: Readonly<ForgotPasswordProps>) {

    const { t } = useTranslation();
    const auth = useAuth();

    const resetPassword = async (data: FormData): Promise<Response> => {
        const res = await Rest.postFormData(auth, RestEndpoint.UserResetPasswordRequest, data);
        if (res.status >= 400) {
            return Promise.reject(new Error(res.statusText));
        }
        return res;
    }

    return (
        <Dialog open={open} onOpenChange={(s) => !s && handleClose}>
            <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>

                <DialogHeader>
                    <DialogTitle>{t("reset-password")}</DialogTitle>
                    <DialogDescription>{t("dialog.forgot-password.text")}</DialogDescription>
                </DialogHeader>

                <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    resetPassword(new FormData(event.currentTarget));
                    // TODO Mail successful send);

                    handleClose();
                }}>
                    <Label htmlFor="mailAddress">{t("emailAddress")}</Label>
                    <Input
                        autoFocus
                        required
                        id="mailAddress"
                        name="mailAddress"
                        placeholder={t("emailAddress")}
                        type="email"
                        style={{ width: "100%" }}
                    />

                    <DialogFooter>
                        <Button variant="outline" onClick={handleClose}>{t("cancel")}</Button>
                        <Button type="submit">
                            {t("continue")}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}