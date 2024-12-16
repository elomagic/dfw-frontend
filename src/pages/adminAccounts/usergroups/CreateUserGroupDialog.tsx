import {useTranslation} from "react-i18next";
import * as Rest from "../../../RestClient.ts"
import {RestEndpoint} from "../../../RestClient.ts"
import {useAuth} from "../../../auth/useAuth.ts";
import {useState} from "react";
import {UserAccountGroup} from "../../../DTOs.ts";
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

interface CreateUserGroupProps {
    open: boolean;
    handleClose: (dto: UserAccountGroup|undefined) => void;
}

export default function CreateUserGroupDialog({ open, handleClose }: Readonly<CreateUserGroupProps>) {

    const { t } = useTranslation();
    const auth = useAuth();
    const [name, setName] = useState("");

    const handleCreateClick = () => {
        const data: UserAccountGroup = {
            name,
            userAccounts: [],
            roles: []
        }

        Rest
            .post(auth, RestEndpoint.UserGroup, data)
            .then(() => handleClose(data))
            .then(() => toaster(t("successful-created"), 'success'))
            .catch((err: Error) => toaster(t("creation-failed", { message: err.message }), 'error'));
    }

    return (
        <Dialog open={open} onOpenChange={(s) => !s && handleClose(undefined)}>
            <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                <DialogHeader>
                    <DialogTitle>{t("create-user-group")}</DialogTitle>
                    <DialogDescription>Please enter the name of the new user group</DialogDescription>
                </DialogHeader>

                <Label htmlFor="name">{t("name")}</Label>
                <Input
                    id="name"
                    name="name"
                    value={name}
                    autoFocus
                    required
                    placeholder={t("name")}
                    type="text"
                    style={{ width: "100%" }}
                    onChange={e => setName(e.target.value)}
                />

                <DialogFooter>
                    <Button variant="outline" onClick={() => handleClose(undefined)}>{t("cancel")}</Button>
                    <Button onClick={handleCreateClick}>
                        {t("create")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}