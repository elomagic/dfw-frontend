import {useTranslation} from "react-i18next";
import * as Rest from "../../RestClient.ts"
import {RestEndpoint} from "../../RestClient.ts"
import {useAuth} from "../../auth/useAuth.ts";
import {useState} from "react";
import {Repository, RepositoryTypes} from "../../DTOs.ts";
import {FormSelect} from "../../components/FormSelect.tsx";
import { toaster } from '../../Toaster.ts';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "../../components/ui/dialog.tsx";
import {Button} from "../../components/ui/button.tsx";
import {Input} from "../../components/ui/input.tsx";
import {Label} from "../../components/ui/label.tsx";

interface ForgotPasswordProps {
    open: boolean;
    handleClose: (dto: Repository|undefined) => void;
}

export default function CreateRepositoryDialog({ open, handleClose }: Readonly<ForgotPasswordProps>) {

    const { t } = useTranslation();
    const auth = useAuth();
    const [name, setName] = useState("");
    const [type, setType] = useState<RepositoryTypes>("NPM");

    const handleCreateClick = () => {
        const data: Repository = {
            name,
            type,
            enabled: false,
            groupPermissions: [],
            forwardHeaders: false
        }

        Rest
            .post(auth, RestEndpoint.Repository, data)
            .then(() => handleClose(data))
            .then(() => toaster(t("successful-created"), 'success'))
            .catch((err: Error) => toaster(t("creation-failed", { message: err.message }), 'error'));
    }

    return (
        <Dialog open={open} onOpenChange={(s) => !s && handleClose(undefined)}>

            <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                <DialogHeader>
                    <DialogTitle>{t("create-repository")}</DialogTitle>
                    <DialogDescription>Please enter the name and the type of the new repository</DialogDescription>
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
                    style={ { width: "100%" } }
                    onChange={e => setName(e.target.value)}
                />
                <FormSelect id="type"
                            value={type}
                            label={t("type")}
                            items={[
                                { "key": "MAVEN", "label": "MAVEN" },
                                { "key": "NPM", "label": "NPM" },
                                { "key": "DOCKER", "label": "DOCKER" },
                                { "key": "NUGET", "label": "NUGET" },
                            ]}
                            onChange={(e) => setType(e as RepositoryTypes)}
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