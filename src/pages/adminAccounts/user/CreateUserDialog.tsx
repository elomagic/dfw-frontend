"use client"

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useTranslation} from "react-i18next";
import * as Rest from "../../../RestClient.ts"
import {RestEndpoint} from "../../../RestClient.ts"
import {useAuth} from "../../../auth/useAuth.ts";
import {useState} from "react";
import {UserAccount} from "../../../DTOs.ts";
import {toaster} from "../../../Toaster.ts";
import FormTextField from "../../../components/FormTextField.tsx";

interface ComponentProps {
    open: boolean;
    handleClose: (dto: UserAccount|undefined) => void;
}

export default function CreateUserDialog({ open, handleClose }: Readonly<ComponentProps>) {

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
        <Dialog
            open={open}
            onClose={() => handleClose (undefined)}
            PaperProps={{ sx: { backgroundImage: 'none' }}}
        >
            <DialogTitle>{t("create-user-account")}</DialogTitle>

            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                <DialogContentText>Please enter the mail address of the new user account</DialogContentText>

                <FormTextField id="mailAddress"
                               value={mailAddress}
                               onChange={e => setMailAddress(e.target.value)}
                               label={t("mailAddress")}
                               type="email"
                               autoFocus
                               required
                />
            </DialogContent>
            <DialogActions sx={{ pb: 3, px: 3 }}>
                <Button onClick={() => handleClose(undefined)}>{t("cancel")}</Button>
                <Button variant="contained" onClick={handleCreateClick}>{t("create")}</Button>
            </DialogActions>
        </Dialog>
    );
}