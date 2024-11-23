import {CredentialData, Repository} from "../../DTOs.ts";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {InputAdornment} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {validateRequiredText, validateRequiredUrl} from "../../Validators.ts";
import * as Rest from "../../RestClient.ts";
import {useAuth} from "../../auth/useAuth.ts";
import RepositoryTypeIcon from "../../components/RepositoryTypeIcon.tsx";
import {enqueueSnackbar} from "notistack";
import FormButtons from "../../components/FormButtons.tsx";
import FormTextField from "../../components/FormTextField.tsx";
import {FormCheckbox} from "../../components/FormCheckBox.tsx";
import {FormSelect, KeyLabelItem} from "../../components/FormSelect.tsx";

interface EditableTableRowProps {
    repository: Repository
    onSaveClick: (data: Repository) => void;
    onDeleteRequest: () => void
}

export default function EditableTableRow({ repository, onSaveClick, onDeleteRequest }: Readonly<EditableTableRowProps>) {

    const { t } = useTranslation();
    const auth = useAuth();

    const [id] = useState(repository.id);
    const [enabled, setEnabled] = useState(repository.enabled);
    const [name, setName] = useState(repository.name);
    const [description, setDescription] = useState(repository.description);
    const [baseUri, setBaseUri] = useState(repository.baseUri);
    const [credentialId, setCredentialId] = useState<string>(repository.credentialId ?? "-");

    const [credentialsIds, setCredentialsIds] = useState<KeyLabelItem[]>([{ key: "-", label: "-"}]);

    const [nameErrorMessage, setNameErrorMessage] = useState<string|undefined>(undefined);
    const [baseUriErrorMessage, setBaseUriErrorMessage] = useState<string|undefined>(undefined);

    const handleSaveClick = () => {
        if (!validateRequiredText(name, setNameErrorMessage)
            || !validateRequiredUrl(baseUri, setBaseUriErrorMessage)) {
            return;
        }

        onSaveClick({id, enabled, type: repository.type, name, description, baseUri, credentialId});
    };

    useEffect(() => {
        Rest.get(auth, Rest.RestEndpoint.Credential)
            .then((res) => res.json())
            .then((rs: CredentialData[]) => rs.map(c => { return { "key": c.credentialId, "label": c.credentialId} as KeyLabelItem }))
            .then((cd: KeyLabelItem[]) => {
                cd.unshift({ key: "-", label: "-"});
                return cd;
            })
            .then((kl: KeyLabelItem[]) => setCredentialsIds(kl))
            .catch((err: Error) => enqueueSnackbar(t("getting-data-failed",  { message: err.message }), { variant: 'error' } ));
    }, [auth, t]);

    return (
        <Grid container spacing={2} marginTop={2} marginBottom={2}>
            <FormTextField id="name"
                                 value={name}
                                 errorMessage={nameErrorMessage}
                                 onChange={e => {
                                     validateRequiredText(e.target.value, setNameErrorMessage);
                                     setName(e.target.value);
                                 }}
                                 label={t("name")}
                                 autoFocus
                                 required
                                 gridSize={6}
            />
            <FormTextField id="description"
                                 value={description}
                                 onChange={e => setDescription(e.target.value)}
                                 label={t("description")}
                                 gridSize={6}
            />

            <FormTextField id="baseUrl"
                                 type="url"
                                 value={baseUri}
                                 errorMessage={baseUriErrorMessage}
                                 onChange={e => {
                                     validateRequiredUrl(e.target.value, setBaseUriErrorMessage);
                                     setBaseUri(e.target.value)
                                 }}
                                 label={t("baseUrl")}
                                 required
                                 gridSize={6}
            />
            <FormSelect id="credentialId"
                        value={credentialId}
                        label={t("credentialId")}
                        items={credentialsIds}
                        onChange={(e) => setCredentialId(e.target.value as string)}
                        gridSize={6}
            />

            <FormTextField id="type"
                                 value={repository.type}
                                 label={t("type")}
                                 gridSize={6}
                                 readOnly
                                 startAdornment={(
                                     <InputAdornment position="start">
                                         <RepositoryTypeIcon type={repository.type} />
                                     </InputAdornment>
                                )}
            />
            <FormCheckbox id="enabled"
                          value={enabled}
                          label={t("enabled")}
                          onChange={e => setEnabled(e.target.checked)}
                          gridSize={6}
            />

            <FormButtons onSaveClick={handleSaveClick} onDeleteClick={onDeleteRequest}/>
        </Grid>
    );
}
