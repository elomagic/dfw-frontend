import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import {useTranslation} from "react-i18next";
import * as Rest from "../../RestClient.ts"
import {RestEndpoint} from "../../RestClient.ts"
import {useAuth} from "../../auth/useAuth.ts";
import {useState} from "react";
import {Repository, RepositoryTypes} from "../../DTOs.ts";
import {FormSelect} from "../../components/FormSelect.tsx";
import { toaster } from '../../Toaster.ts';

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
        <Dialog
            open={open}
            onClose={() => handleClose(undefined)}
            PaperProps={{ sx: { backgroundImage: 'none' }}}
        >
            <DialogTitle>{t("create-repository")}</DialogTitle>
            <DialogContent
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
            >
                <DialogContentText>
                    Please enter the name and the type of the new repository
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
                <FormSelect id="type"
                            value={type}
                            label={t("type")}
                            items={[
                                { "key": "MAVEN", "label": "MAVEN" },
                                { "key": "NPM", "label": "NPM" },
                                { "key": "DOCKER", "label": "DOCKER" },
                                { "key": "NUGET", "label": "NUGET" },
                            ]}
                            onChange={(e) => setType(e.target.value as RepositoryTypes)}
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