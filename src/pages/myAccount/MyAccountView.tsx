"use client"

import {Box, Card} from "@mui/material";
import {useAuth} from "@/auth/useAuth.ts";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import * as Rest from "../../RestClient.ts";
import Grid from "@mui/material/Grid2";
import {validateRequiredText} from "@/Validators.ts";
import {UserAccount, UserAccountApiKey} from "@/DTOs.ts";
import {FormSelect} from "@components/FormSelect.tsx";
import { toaster } from "@/Toaster.ts";
import {FormTextField} from "@components/FormTextField.tsx";
import {FormButtons} from "@components/FormButtons.tsx";
import { FormList } from "@components/FormList.tsx";
import {CreateApiKeyDialog} from "./CreateApiKeyDialog.tsx";

export const MyAccountView = () => {

    const { t, i18n } = useTranslation();
    const auth = useAuth();

    const [mailAddress] = useState(auth.mailAddress);
    const [displayName, setDisplayName] = useState(auth.displayName);
    const [language, setLanguage] = useState<string>(auth.language ?? "en");
    const [apiKeys, setApiKeys] = useState<UserAccountApiKey[]>([]);

    const [openCreate, setOpenCreate] = useState<boolean>(false);

    const [displayNameErrorMessage, setDisplayNameErrorMessage] = useState<string|undefined>(undefined);

    const handleSaveClick = () => {
        if (!validateRequiredText(displayName, setDisplayNameErrorMessage)) {
            return;
        }

        const data: UserAccount = {
            mailAddress: auth.mailAddress ?? "",
            displayName: displayName ?? "",
            language: language ?? "en",
            // Following properties will be ignored by server
            enabled: false,
            changePassword: true,
            apiKeys: apiKeys
        }

        i18n.changeLanguage(language)
            .then(() => Rest.patch(auth, Rest.Endpoint.UserSelf, data))
            .then(() => toaster(t("successful-saved"), 'success'))
            .catch((err: Error) => toaster(t("saving-data-failed", { message: err.message}), 'error'));
    };

    const handleCloseKeyDialog = (data: UserAccountApiKey|undefined) => {
        setOpenCreate(false);

        if (!data) {
            return
        }

        const newData = [...apiKeys];
        newData.push(data);

        setApiKeys(newData);
    }

    useEffect(() => {
        Rest.get<UserAccount>(auth, Rest.Endpoint.UserSelf)
            .then((dto: UserAccount) => {
                setDisplayName(dto.displayName);
                setLanguage(dto.language);
                setApiKeys(dto.apiKeys ?? []);
            })
            .catch((err: Error) => {
                setApiKeys([])
                toaster(t("getting-data-failed",  { message: err.message }), 'error');
            });
    }, [auth, t]);

    return (
        <Box margin={3}>
            <Card>
                <Grid container spacing={2} margin={2}>
                    <FormTextField id="mailAddress"
                                         value={mailAddress}
                                         label={t("mailAddress")}
                                         gridSize={6}
                    />
                    <FormTextField id="displayName"
                                   value={displayName}
                                   errorMessage={displayNameErrorMessage}
                                     onChange={setDisplayName}
                                     label={t("displayName")}
                                     autoFocus
                                     required
                                     gridSize={6}
                    />

                    <FormSelect id="language"
                                value={language}
                                label={t("language")}
                                items={[
                                    { "key": "en", "label": t("english") },
                                    { "key": "de", "label": t("german") },
                                ]}
                                onChange={setLanguage}
                                gridSize={6}
                    />
                    <FormList<UserAccountApiKey>
                        value={apiKeys}
                        label={t("api-keys")}
                        getItemLabel={(item) => { return item.comment ?? ""}}
                        onChange={setApiKeys}
                        onAddClick={() => setOpenCreate(true)}
                        gridSize={6}
                    />

                    <FormButtons onSaveClick={handleSaveClick}/>
                </Grid>
            </Card>
            <CreateApiKeyDialog open={openCreate} handleClose={(data) => handleCloseKeyDialog(data)} />
        </Box>
    );
}
