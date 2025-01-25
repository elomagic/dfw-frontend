"use client"

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import {useTranslation} from "react-i18next";
import * as Rest from "../../RestClient.ts"
import {useAuth} from "@/auth/useAuth.ts";
import {AxiosResponse} from "axios";

interface ForgotPasswordProps {
    open: boolean;
    handleClose: () => void;
}

export const ForgotPasswordDialog = ({ open, handleClose }: Readonly<ForgotPasswordProps>) => {

    const { t } = useTranslation();
    const auth = useAuth();

    const resetPassword = async (data: FormData): Promise<AxiosResponse> => {
        const res = await Rest.postForm(auth, Rest.Endpoint.UserResetPasswordRequest, data);
        if (res.status >= 400) {
            return Promise.reject(new Error(res.statusText));
        }
        return res;
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            slotProps={{
                paper: {
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        resetPassword(new FormData(event.currentTarget));
                        // TODO Mail successful send);

                        handleClose();
                    },
                    sx: {
                        backgroundImage: 'none',
                        width: '400px'
                    },
                }
            }}
        >
            <DialogTitle>{t("reset-password")}</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                <DialogContentText>{t("dialog.forgot-password.text")}</DialogContentText>
                <OutlinedInput
                    autoFocus
                    required
                    margin="dense"
                    id="mailAddress"
                    name="mailAddress"
                    label={t("emailAddress")}
                    placeholder={t("emailAddress")}
                    type="email"
                    size="small"
                    fullWidth
                />
            </DialogContent>
            <DialogActions sx={{ pb: 3, px: 3 }}>
                <Button onClick={handleClose}>{t("cancel")}</Button>
                <Button variant="contained" type="submit">
                    {t("continue")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}