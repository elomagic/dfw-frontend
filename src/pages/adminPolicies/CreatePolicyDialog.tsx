import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useTranslation} from "react-i18next";
import * as Rest from "../../RestClient.ts"
import {RestEndpoint} from "../../RestClient.ts"
import {useAuth} from "../../auth/useAuth.ts";
import {useState} from "react";
import {Policy, ViolationState} from "../../DTOs.ts";
import {FormSelect, mapToKeyLabelItemArray} from "../../components/FormSelect.tsx";
import { toaster } from '../../Toaster.ts';
import FormTextField from "../../components/FormTextField.tsx";

interface ComponentProps {
    open: boolean;
    handleClose: (dto: Policy|undefined) => void;
}

export default function CreatePolicyDialog({ open, handleClose }: Readonly<ComponentProps>) {

    const { t } = useTranslation();
    const auth = useAuth();
    const [name, setName] = useState("");
    const [violationState, setViolationState] = useState<ViolationState>("FAIL");

    const handleCreateClick = () => {
        const data: Policy = {
            name,
            violationState,
            enabled: false,
            conditions: []
        }

        Rest
            .post(auth, RestEndpoint.Policy, data)
            .then(() => handleClose(data))
            .then(() => toaster(t("successful-created"), 'success'))
            .catch((err: Error) => toaster(t("creation-failed", { message: err.message }), 'error'));
    }

    return (
        <Dialog
            open={open}
            onClose={() => handleClose(undefined)}
            PaperProps={{ sx: { backgroundImage: 'none' }}}
        >
            <DialogTitle>{t("create-policy")}</DialogTitle>
            <DialogContent
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
            >
                <DialogContentText>
                    Please enter the name and the violation state of the new policy
                </DialogContentText>
                <FormTextField id="name"
                               value={name}
                               onChange={e => setName(e.target.value)}
                               label={t("name")}
                               autoFocus
                               required
                />
                <FormSelect id="type"
                            value={violationState}
                            label={t("type")}
                            items={mapToKeyLabelItemArray(["FAIL", "WARN", "INFO"])}
                            onChange={(e) => setViolationState(e.target.value as ViolationState)}
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