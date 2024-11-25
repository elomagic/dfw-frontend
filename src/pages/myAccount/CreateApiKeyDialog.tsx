import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {UserAccountApiKey} from "../../DTOs.ts";
import FormTextField from "../../components/FormTextField.tsx";
import { v4 as uuidv4 } from 'uuid';
import {validateRequiredText} from "../../Validators.ts";

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
        <Dialog
            open={open}
            PaperProps={{ sx: { width: "500px", backgroundImage: 'none' }}}
        >
            <DialogTitle>{t("create-api-key")}</DialogTitle>
            <DialogContent
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
            >
                <DialogContentText>
                    Please enter usage for your new API Key
                </DialogContentText>
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
                <DialogContentText>
                    Copy the generated API Key and store it somewhere safe before you continue !!!
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ pb: 3, px: 3 }}>
                <Button onClick={() => handleClose(undefined)}>{t("cancel")}</Button>
                <Button variant="contained" onClick={handleCreateClick}>
                    {t("create")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}