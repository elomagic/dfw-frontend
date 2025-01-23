"use client"

import {CredentialData, Proxy, UserAccountGroup} from "../../DTOs.ts";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {InputAdornment} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {validateRequiredText, validateRequiredUrl} from "../../Validators.ts";
import * as Rest from "../../RestClient.ts";
import {useAuth} from "../../auth/useAuth.ts";
import {FormCheckbox} from "../../components/FormCheckBox.tsx";
import {FormSelect, KeyLabelItem} from "../../components/FormSelect.tsx";
import {Role} from "../../auth/Auth.tsx";
import {toaster} from "../../Toaster.ts";
import { FormTextField } from "../../components/FormTextField.tsx";
import {ProxyTypeIcon} from "../../components/ProxyTypeIcon.tsx";
import {FormButtons} from "../../components/FormButtons.tsx";
import { FormSelectList } from "../../components/FormSelectList.tsx";

interface ComponentProps {
    proxy: Proxy
    onSaveClick: (data: Proxy) => void;
    onDeleteRequest: () => void
}

export const EditableTableRow = ({ proxy, onSaveClick, onDeleteRequest }: Readonly<ComponentProps>) => {

    const { t } = useTranslation();
    const auth = useAuth();

    const [id] = useState(proxy.id);
    const [enabled, setEnabled] = useState(proxy.enabled);
    const [name, setName] = useState(proxy.name);
    const [description, setDescription] = useState(proxy.description);
    const [baseUri, setBaseUri] = useState(proxy.baseUri);
    const [credentialId, setCredentialId] = useState<string>(proxy.credentialId ?? "-");
    const [groupPermissions, setGroupPermissions] = useState<UserAccountGroup[]>([]);
    const [forwardHeaders, setForwardHeaders] = useState(proxy.forwardHeaders);

    const [credentialsIds, setCredentialsIds] = useState<KeyLabelItem[]>([{ key: "-", label: "-"}]);
    const [allGroups, setAllGroups] = useState<UserAccountGroup[]>([]);

    const [nameErrorMessage, setNameErrorMessage] = useState<string|undefined>(undefined);
    const [baseUriErrorMessage, setBaseUriErrorMessage] = useState<string|undefined>(undefined);

    const handleSaveClick = () => {
        if (!validateRequiredText(name, setNameErrorMessage)
            || !validateRequiredUrl(baseUri, setBaseUriErrorMessage)) {
            return;
        }

        onSaveClick({
            id,
            enabled,
            type: proxy.type,
            name, description,
            baseUri,
            credentialId,
            groupPermissions,
            forwardHeaders
        });
    };

    useEffect(() => {
        Rest.get<CredentialData[]>(auth, Rest.Endpoint.Credential)
            .then((rs: CredentialData[]) => rs.map(c => { return { "key": c.credentialId, "label": c.credentialId} as KeyLabelItem }))
            .then((cd: KeyLabelItem[]) => {
                cd.unshift({ key: "-", label: "-"});
                return cd;
            })
            .then((kl: KeyLabelItem[]) => setCredentialsIds(kl))
            .catch((err: Error) => toaster(t("getting-data-failed",  { message: err.message }), 'error'));

        Rest.get<UserAccountGroup[]>(auth, Rest.Endpoint.UserGroup)
            .then((rs: UserAccountGroup[]) => setAllGroups(rs))
            .catch((err: Error) => toaster(t("getting-data-failed",  { message: err.message }), 'error'));
    }, [auth, t]);

    return (
        <Grid container spacing={2} marginTop={2} marginBottom={2}>
            <FormTextField id="name"
                           value={name}
                           errorMessage={nameErrorMessage}
                           onChange={setName}
                           label={t("name")}
                           autoFocus
                           required
                           gridSize={6}
            />
            <FormTextField id="description"
                           value={description}
                           onChange={setDescription}
                           label={t("description")}
                           gridSize={6}
            />

            <FormTextField id="baseUrl"
                           type="url"
                           value={baseUri}
                           errorMessage={baseUriErrorMessage}
                           onChange={newValue => {
                               validateRequiredUrl(newValue, setBaseUriErrorMessage);
                               setBaseUri(newValue)
                           }}
                           label={t("baseUrl")}
                           required
                           gridSize={6}
            />
            <FormSelect id="credentialId"
                        value={credentialId}
                        label={t("credentialId")}
                        items={credentialsIds}
                        onChange={setCredentialId}
                        gridSize={6}
            />

            <FormTextField id="type"
                           value={proxy.type}
                           label={t("type")}
                           gridSize={6}
                           readOnly
                           startAdornment={(
                               <InputAdornment position="start">
                                   <ProxyTypeIcon type={proxy.type} />
                               </InputAdornment>
                           )}
            />
            <FormCheckbox id="forwardHeaders"
                          value={forwardHeaders}
                          label={t("forward-http-headers")}
                          onChange={setForwardHeaders}
                          gridSize={6}
            />

            <FormCheckbox id="enabled"
                          value={enabled}
                          label={t("enabled")}
                          onChange={setEnabled}
                          gridSize={12}
            />

            <FormSelectList<UserAccountGroup>
                value={groupPermissions}
                selectables={allGroups}
                label={t("user-groups")}
                editRole={Role.PROXY_UPDATE}
                gridSize={6}
                getItemId={(item: UserAccountGroup) => item.id ?? ""}
                getItemLabel={(item: UserAccountGroup) => item.name}
                onChange={(items) => setGroupPermissions(items)}
            />

            <FormButtons roleRightButton={Role.PROXY_UPDATE}
                         roleLeftButton={Role.PROXY_DELETE}
                         onSaveClick={handleSaveClick}
                         onDeleteClick={onDeleteRequest}/>
        </Grid>
    );
}
