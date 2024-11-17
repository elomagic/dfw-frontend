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
import {useEffect, useState} from "react";
import {License, LicensePurlMap} from "../../../DTOs.ts";
import {enqueueSnackbar} from "notistack";
import {FormSelect, KeyLabelItem} from "../../../components/FormSelect.tsx";
import FormTextField from "../../../components/FormTextField.tsx";

interface CreatePurlMapProps {
    open: boolean;
    handleClose: (created: boolean) => void;
}

export default function CreatePurlMapDialog({ open, handleClose }: Readonly<CreatePurlMapProps>) {

    const { t } = useTranslation();
    const auth = useAuth();
    const [purlMatch, setPurlMatch] = useState("");
    const [spdxId, setSpdxId] = useState("");
    const [spdxList, setSpdxList] = useState<KeyLabelItem[]>([]);

    const handleCreateClick = () => {
        const data: LicensePurlMap = {
            purlMatch,
            spdxId
        }

        Rest
            .post(auth, RestEndpoint.LicensePurlMap, data)
            .then(res => {
                if (res.status >= 400) {
                    return Promise.reject(new Error(res.statusText));
                }
                return res;
            })
            .then(() => handleClose(true))
            .then(() => enqueueSnackbar(t("successful-created"), { variant: 'success'} ))
            .catch((err: Error) => enqueueSnackbar("Creation failed: " + err.message, { variant: 'error'} ));
    }

    useEffect(() => {
        Rest.get(auth, Rest.RestEndpoint.License)
            .then((res) => res.json())
            .then((rs: License[]) => rs.map(l => { return { "key": l.licenseId, "label": l.name} as KeyLabelItem })) // setSpdxList(rs))
            .then((kl: KeyLabelItem[]) => setSpdxList(kl))
            .catch((err: Error) => enqueueSnackbar("Getting spdx list failed: " + err.message, { variant: 'error'} ));
    }, [auth]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{ sx: { backgroundImage: 'none' }}}
        >
            <DialogTitle>{t("create-purl-mapping")}</DialogTitle>
            <DialogContent
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
            >
                <DialogContentText>
                    Please enter mapping details
                </DialogContentText>
                <FormTextField id="nameMatch"
                               value={purlMatch}
                               onChange={e => setPurlMatch(e.target.value)}
                               label={t("name-match")}
                               autoFocus
                               required
                               gridSize={6}
                />
                <FormSelect id="spdxId"
                            value={spdxId}
                            label={t("spdx-id")}
                            items={spdxList}
                            onChange={(e) => setSpdxId(e.target.value as string)}
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