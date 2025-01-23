"use client"

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useTranslation} from "react-i18next";
import * as Rest from "../../../RestClient.ts"
import {Endpoint} from "../../../RestClient.ts"
import {useAuth} from "../../../auth/useAuth.ts";
import {useEffect, useState} from "react";
import {License, LicensePurlMap} from "../../../DTOs.ts";
import {FormSelect, KeyLabelItem} from "../../../components/FormSelect.tsx";
import {toaster} from "../../../Toaster.ts";
import {FormTextField} from "../../../components/FormTextField.tsx";

interface ComponentProps {
    open: boolean;
    handleClose: (dto: LicensePurlMap|undefined) => void;
}

export default function CreatePurlMapDialog({ open, handleClose }: Readonly<ComponentProps>) {

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

        Rest.post(auth, Endpoint.LicensePurlMap, data)
            .then(() => handleClose(data))
            .then(() => toaster(t("successful-created"), 'success'))
            .catch((err: Error) => toaster(t("creation-failed", { message: err.message }), 'error'));
    }

    useEffect(() => {
        Rest.get<License[]>(auth, Rest.Endpoint.License)
            .then((rs: License[]) => rs.map(l => { return { "key": l.licenseId, "label": l.name} as KeyLabelItem })) // setSpdxList(rs))
            .then((kl: KeyLabelItem[]) => setSpdxList(kl))
            .catch((err: Error) => toaster("Getting spdx list failed: " + err.message, 'error'));
    }, [auth]);

    return (
        <Dialog
            open={open}
            onClose={() => handleClose(undefined)}
            PaperProps={{ sx: { backgroundImage: 'none' }}}
        >
            <DialogTitle>{t("create-purl-mapping")}</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                <DialogContentText>{t("please-enter-mapping-details")}</DialogContentText>
                <FormTextField id="purlMatch"
                               value={purlMatch}
                               onChange={setPurlMatch}
                               label={t("purl-match")}
                               autoFocus
                               required
                />
                <FormSelect id="spdxId"
                            value={spdxId}
                            label={t("spdx-id")}
                            items={spdxList}
                            onChange={setSpdxId}
                />
            </DialogContent>
            <DialogActions sx={{ pb: 3, px: 3 }}>
                <Button onClick={() => handleClose(undefined)}>{t("cancel")}</Button>
                <Button variant="contained" onClick={handleCreateClick}>{t("create")}</Button>
            </DialogActions>
        </Dialog>
    );
}