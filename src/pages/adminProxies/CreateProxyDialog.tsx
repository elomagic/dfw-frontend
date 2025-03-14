"use client"

import {useState} from "react";
import {useTranslation} from "react-i18next";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as Rest from "../../RestClient.ts"
import {useAuth} from "@/auth/useAuth.ts";
import {FormSelect, mapToKeyLabelItemArray} from "@components/FormSelect.tsx";
import {FormTextField} from "@components/FormTextField.tsx";
import {toaster} from '@/Toaster.ts';
import {Proxy, ProxyType} from "@/DTOs.ts";

interface ComponentProps {
    open: boolean;
    handleClose: (dto: Proxy|undefined) => void;
}

export const CreateProxyDialog = ({ open, handleClose }: Readonly<ComponentProps>) => {

    const { t } = useTranslation();
    const auth = useAuth();
    const [name, setName] = useState("");
    const [type, setType] = useState<ProxyType>(ProxyType.NPM);

    const handleCreateClick = () => {
        const data: Proxy = {
            name,
            type,
            enabled: false,
            groupPermissions: [],
            forwardHeaders: false
        }

        Rest.post(auth, Rest.Endpoint.Proxy, data)
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
            <DialogTitle>{t("create-proxy")}</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                <DialogContentText>{t("pages.admin-proxies.dialog.create.text")}</DialogContentText>
                <FormTextField id="name"
                               value={name}
                               onChange={setName}
                               label={t("name")}
                               autoFocus
                               required
                />
                <FormSelect id="type"
                            value={ProxyType[type]}
                            label={t("type")}
                            items={mapToKeyLabelItemArray(Object.keys(ProxyType))}
                            onChange={key => setType(ProxyType[key as keyof typeof ProxyType])}
                />
            </DialogContent>
            <DialogActions sx={{ pb: 3, px: 3 }}>
                <Button onClick={() => handleClose(undefined)}>{t("cancel")}</Button>
                <Button variant="contained" onClick={handleCreateClick}>{t("create")}</Button>
            </DialogActions>
        </Dialog>
    );
}