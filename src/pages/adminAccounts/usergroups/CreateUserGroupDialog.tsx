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
import {UserAccountGroup} from "../../../DTOs.ts";
import {enqueueSnackbar} from "notistack";

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
            userAccountMailAddresses: [],
            roles: []
        }

        Rest
            .post(auth, RestEndpoint.UserGroup, data)
            .then(() => handleClose(data))
            .then(() => enqueueSnackbar(t("successful-created"), { variant: 'success'} ))
            .catch((err: Error) => enqueueSnackbar(t("creation-failed", { message: err.message }), { variant: 'error' } ));
    }

    return (
        <Dialog
            open={open}
            onClose={() => handleClose(undefined)}
            PaperProps={{ sx: { backgroundImage: 'none' }}}
        >
            <DialogTitle>{t("create-user-group")}</DialogTitle>
            <DialogContent
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
            >
                <DialogContentText>
                    Please enter the name of the new user group
                </DialogContentText>
                <OutlinedInput
                    id="name"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    autoFocus
                    required
                    margin="dense"
                    label={t("name")}
                    placeholder={t("name")}
                    type="text"
                    fullWidth
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