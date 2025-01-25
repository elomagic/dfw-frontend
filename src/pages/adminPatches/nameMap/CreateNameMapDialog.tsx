"use client"

import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as Rest from "../../../RestClient.ts"
import {toaster} from "@/Toaster.ts";
import {useAuth} from "@/auth/useAuth.ts";
import {FormSelect, KeyLabelItem} from "@components/FormSelect.tsx";
import {FormTextField} from "@components/FormTextField.tsx";
import {License, LicenseNameMap} from "@/DTOs.ts";

interface ComponentProps {
    open: boolean;
    handleClose: (dto: LicenseNameMap|undefined) => void;
}

export const CreateNameMapDialog = ({ open, handleClose }: Readonly<ComponentProps>) => {

    const { t } = useTranslation();
    const auth = useAuth();
    const [nameMatch, setNameMatch] = useState("");
    const [spdxId, setSpdxId] = useState("");
    const [spdxList, setSpdxList] = useState<KeyLabelItem[]>([]);

    const handleCreateClick = () => {
        const data: LicenseNameMap = {
            nameMatch,
            spdxId
        }

        Rest.post(auth, Rest.Endpoint.LicenseNameMap, data)
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
            <DialogTitle>{t("create-name-mapping")}</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                <DialogContentText>Please enter mapping details</DialogContentText>
                <FormTextField id="nameMatch"
                               value={nameMatch}
                               onChange={setNameMatch}
                               label={t("name-match")}
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