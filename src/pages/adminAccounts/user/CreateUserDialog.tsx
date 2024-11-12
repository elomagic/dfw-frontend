import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import {useTranslation} from "react-i18next";
import * as Rest from "../../../RestClient.ts"
import {RestEndpoint} from "../../../RestClient.ts"
import {useAuth} from "../../../auth/useAuth.ts";
import {useState} from "react";
import {UserAccount} from "../../../DTOs.ts";

interface CreateUserProps {
    open: boolean;
    handleClose: (created: boolean) => void;
}

export default function CreateUserDialog({ open, handleClose }: Readonly<CreateUserProps>) {

    const { t } = useTranslation();
    const auth = useAuth();
    const [mailAddress, setMailAddress] = useState("");

    const handleCreateClick = () => {
        const data: UserAccount = {
            mailAddress,
            displayName: '',
            enabled: false,
            changePassword: true,
        }

        Rest
            .post(auth, RestEndpoint.User, data)
            .then(res => {
                if (res.status >= 400) {
                    return Promise.reject(new Error(res.statusText));
                }
                return res;
            })
            .then(() => handleClose(true));
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{ sx: { backgroundImage: 'none' }}}
        >
            <DialogTitle>{t("create-repository")}</DialogTitle>
            <DialogContent
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
            >
                <DialogContentText>
                    Please enter the mail address of the new user account
                </DialogContentText>
                <OutlinedInput
                    id="mailAddress"
                    name="mailAddress"
                    value={mailAddress}
                    onChange={e => setMailAddress(e.target.value)}
                    autoFocus
                    required
                    margin="dense"
                    label={t("mailAddress")}
                    placeholder={t("mailAddress")}
                    type="email"
                    fullWidth
                />
            </DialogContent>
            <DialogActions sx={{ pb: 3, px: 3 }}>
                <Button onClick={() => handleClose(false)}>{t("cancel")}</Button>
                <Button variant="contained" onClick={handleCreateClick}>
                    {t("create")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}