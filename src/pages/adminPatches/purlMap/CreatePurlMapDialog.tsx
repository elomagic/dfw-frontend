"use client"

import {useState} from "react";
import {useTranslation} from "react-i18next";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as Rest from "../../../RestClient.ts"
import {useAuth} from "@/auth/useAuth.ts";
import {toaster} from "@/Toaster.ts";
import {FormTextField} from "@components/FormTextField.tsx";
import {LicensePurlMap} from "@/DTOs.ts";
import {FormSpdxSelect} from "@/pages/adminPatches/FormSpdxSelect.tsx";

interface ComponentProps {
    open: boolean;
    handleClose: (dto: LicensePurlMap|undefined) => void;
}

export const CreatePurlMapDialog = ({ open, handleClose }: Readonly<ComponentProps>)=> {

    const { t } = useTranslation();
    const auth = useAuth();
    const [purlMatch, setPurlMatch] = useState("");
    const [spdxId, setSpdxId] = useState("");

    const handleCreateClick = () => {
        const data: LicensePurlMap = {
            purlMatch,
            spdxId
        }

        Rest.post(auth, Rest.Endpoint.LicensePurlMap, data)
            .then(() => handleClose(data))
            .then(() => toaster(t("successful-created"), 'success'))
            .catch((err: Error) => toaster(t("creation-failed", { message: err.message }), 'error'));
    }

    return (
        <Dialog
            open={open}
            onClose={() => handleClose(undefined)}
            slotProps={{
                paper: {
                    sx: { backgroundImage: 'none' }
                }
            }}
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
                <FormSpdxSelect value={spdxId} onChange={setSpdxId}/>
            </DialogContent>
            <DialogActions sx={{ pb: 3, px: 3 }}>
                <Button onClick={() => handleClose(undefined)}>{t("cancel")}</Button>
                <Button variant="contained" onClick={handleCreateClick}>{t("create")}</Button>
            </DialogActions>
        </Dialog>
    );
}