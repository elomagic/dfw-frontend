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
import { FormTextField } from '@components/FormTextField.tsx';
import {UserAccountGroup} from "@/DTOs.ts";

interface ComponentProps {
    open: boolean;
    handleClose: (dto: UserAccountGroup|undefined) => void;
}

export const CreateUserGroupDialog = ({ open, handleClose }: Readonly<ComponentProps>) => {

    const { t } = useTranslation();
    const auth = useAuth();
    const [name, setName] = useState("");

    const handleCreateClick = () => {
        const data: UserAccountGroup = {
            name,
            userAccounts: [],
            roles: []
        }

        Rest.post(auth, Rest.Endpoint.UserGroup, data)
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
            <DialogTitle>{t("create-user-group")}</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                <DialogContentText>Please enter the name of the new user group</DialogContentText>

                <FormTextField id="name"
                               value={name}
                               onChange={setName}
                               label={t("name")}
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