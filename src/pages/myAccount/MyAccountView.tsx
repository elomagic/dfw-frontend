import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import * as Rest from "../../RestClient.ts";
import {validateRequiredText} from "../../Validators.ts";
import FormButtons from "../../components/FormButtons.tsx";
import FormTextField from "../../components/FormTextField.tsx";
import {FormSelect} from "../../components/FormSelect.tsx";
import FormList from "../../components/FormList.tsx";
import CreateApiKeyDialog from "./CreateApiKeyDialog.tsx";
import {useAuth} from "../../auth/useAuth.ts";
import {RestEndpoint} from "../../RestClient.ts";
import {UserAccount, UserAccountApiKey} from "@/DTOs.ts";
import { toaster } from "../../Toaster.ts";
import {Grid} from "../../components/Grids.tsx";
import {ContentTile} from "../../components/ContentTile.tsx";

export default function MyAccountView() {

    const { t } = useTranslation();
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

        Rest.patch(auth, RestEndpoint.UserSelf, data)
            .then(() => toaster(t("successful-saved"), 'success'))
            .catch((err: Error) => toaster(t("saving-data-failed", { message: err.message}), 'error'));
    };


    const handleApiKeysChanged = (keys: UserAccountApiKey[]) => {
        setApiKeys(keys);
    }

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
        Rest.get(auth, RestEndpoint.UserSelf)
            .then((res) => res.json())
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
        <ContentTile>
            <Grid>
                <FormTextField id="mailAddress"
                                     value={mailAddress}
                                     label={t("mailAddress")}
                                     gridSize={6}
                />
                <FormTextField id="displayName"
                               value={displayName}
                               errorMessage={displayNameErrorMessage}
                                 onChange={e => {
                                     setDisplayName(e.target.value)
                                     validateRequiredText(e.target.value, setDisplayNameErrorMessage)
                                 }}
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
                            onChange={(e) => setLanguage(e)}
                            gridSize={6}
                />
                <FormList<UserAccountApiKey>
                    value={apiKeys}
                    label={t("api-keys")}
                    getItemLabel={(item) => { return item.comment ?? ""}}
                    onChange={handleApiKeysChanged}
                    onAddClick={() => setOpenCreate(true)}
                    gridSize={6}
                />

                <FormButtons onSaveClick={handleSaveClick}/>
            </Grid>

            <CreateApiKeyDialog open={openCreate} handleClose={(data) => handleCloseKeyDialog(data)} />
        </ContentTile>
    );
}
