import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {UserAccountApiKey} from "../../DTOs.ts";
import FormTextField from "../../components/FormTextField.tsx";
import { v4 as uuidv4 } from 'uuid';
import {validateRequiredText} from "../../Validators.ts";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "../../components/ui/dialog.tsx";
import {Button} from "../../components/ui/button.tsx";

interface CreateApiKyProps {
    open: boolean;
    handleClose: (dto: UserAccountApiKey|undefined) => void;
}

export default function CreateApiKeyDialog({ open, handleClose }: Readonly<CreateApiKyProps>) {

    const { t } = useTranslation();

    const [comment, setComment] = useState("");
    const [apiKey, setApiKey] = useState("");

    const [descriptionErrorMessage, setDescriptionErrorMessage] = useState<string|undefined>('');

    const handleCreateClick = () => {
        if (validateRequiredText(comment, setDescriptionErrorMessage)) {
            const data: UserAccountApiKey = {
                id: comment,
                apiKey,
                comment
            }

            handleClose(data);
        }
    }

    useEffect(() => {
        if (open) {
            setComment("");
            setApiKey(`dfw${btoa(uuidv4())}`);
        }
    }, [open]);

    return (
        <Dialog open={open}>
            <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                <DialogHeader>
                    <DialogTitle>{t("create-api-key")}</DialogTitle>
                    <DialogDescription>Please enter usage for your new API Key</DialogDescription>
                </DialogHeader>

                <FormTextField
                    id="description"
                    type="text"
                    value={comment}
                    onChange={e => {
                        validateRequiredText(e.target.value, setDescriptionErrorMessage);
                        setComment(e.target.value);
                    }}
                    autoFocus
                    required
                    errorMessage={descriptionErrorMessage}
                    label={t("description")}
                />
                <FormTextField
                    id="apiKey"
                    type="text"
                    value={apiKey}
                    label={t("api-key")}
                    readOnly
                />
                <div>Copy the generated API Key and store it somewhere safe before you continue !!!</div>

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