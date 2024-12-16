import {useTranslation} from "react-i18next";
import * as Rest from "../../../RestClient.ts"
import {RestEndpoint} from "../../../RestClient.ts"
import {useAuth} from "../../../auth/useAuth.ts";
import {useState} from "react";
import {UserAccount} from "../../../DTOs.ts";
import {toaster} from "../../../Toaster.ts";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "../../../components/ui/dialog.tsx";
import {Button} from "../../../components/ui/button.tsx";
import {Input} from "../../../components/ui/input.tsx";
import {Label} from "../../../components/ui/label.tsx";

interface CreateUserProps {
    open: boolean;
    handleClose: (dto: UserAccount|undefined) => void;
}

export default function CreateUserDialog({ open, handleClose }: Readonly<CreateUserProps>) {

    const { t } = useTranslation();
    const auth = useAuth();
    const [mailAddress, setMailAddress] = useState("");

    const handleCreateClick = () => {
        const data: UserAccount = {
            mailAddress,
            displayName: '',
            language: 'en',
            enabled: false,
            changePassword: true,
        }

        Rest
            .post(auth, RestEndpoint.User, data)
            .then(() => handleClose(data))
            .then(() => toaster(t("successful-created"), 'success'))
            .catch((err: Error) => toaster(t("creation-failed", { message: err.message }), 'error'));
    }

    return (
        <Dialog open={open} onOpenChange={(s) => !s && handleClose (undefined)}>

            <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                <DialogHeader>
                    <DialogTitle>{t("create-user-account")}</DialogTitle>
                    <DialogDescription>Please enter the mail address of the new user account</DialogDescription>
                </DialogHeader>

                <Label htmlFor="mailAddress">={t("mailAddress")}</Label>
                <Input
                    id="mailAddress"
                    name="mailAddress"
                    value={mailAddress}
                    onChange={e => setMailAddress(e.target.value)}
                    autoFocus
                    required
                    placeholder={t("mailAddress")}
                    type="email"
                    style={{ width: '100%' }}
                />

                <DialogFooter>
                    <Button variant="outline" onClick={() => handleClose(undefined)}>{t("cancel")}</Button>
                    <Button onClick={handleCreateClick}>{t("create")}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}