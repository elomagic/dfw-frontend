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

interface CreateApiKyProps {
    open: boolean;
    handleClose: (dto: UserAccountApiKey|undefined) => void;
}

export default function CreateApiKeyDialog({ open, handleClose }: Readonly<CreateApiKyProps>) {

    const { t } = useTranslation();

    const [comment, setComment] = useState("");
    const [apiKey, setApiKey] = useState("");

    const handleCreateClick = () => {
        const data: UserAccountApiKey = {
            id: comment,
            apiKey,
            comment
        }

       handleClose(data);
    }

    useEffect(() => {
        setApiKey("todo random key");
    }, []);

    return (
        <Dialog
            open={open}
            onClose={() => handleClose (undefined)}
            PaperProps={{ sx: { backgroundImage: 'none' }}}
        >
            <DialogTitle>{t("create-user-account")}</DialogTitle>
            <DialogContent
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
            >
                <DialogContentText>
                    Please enter usage for your new API Key
                </DialogContentText>
                <FormTextField
                    id="comment"
                    type="text"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    autoFocus
                    required
                    label={t("comment")}
                />
                <FormTextField
                    id="apiKey"
                    type="text"
                    value={apiKey}
                    label={t("api-key")}
                    readOnly
                />
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