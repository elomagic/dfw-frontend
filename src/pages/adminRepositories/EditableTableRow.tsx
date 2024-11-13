import {Repository} from "../../DTOs.ts";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {Button, InputAdornment} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {FormFieldProperty, validateInputs} from "../../FormFieldProperties.ts";
import FormFieldComponents, {FormCheckbox} from "../../components/FormFieldComponents.tsx";
import * as Rest from "../../RestClient.ts";
import {RestEndpoint} from "../../RestClient.ts";
import {useAuth} from "../../auth/useAuth.ts";
import RepositoryTypeIcon from "../../components/RepositoryTypeIcon.tsx";
import {enqueueSnackbar} from "notistack";

const fields: FormFieldProperty[] = [
    { name : "name", minLength: 1 },
    { name : "baseUri", minLength: 8 },
];

interface EditableTableRowProps {
    repository: Repository
}

export default function EditableTableRow({ repository }: Readonly<EditableTableRowProps>) {

    const { t } = useTranslation();
    const auth = useAuth();

    const [id] = useState(repository.id);
    const [enabled, setEnabled] = useState(repository.enabled);
    const [name, setName] = useState(repository.name);
    const [description, setDescription] = useState(repository.description);
    const [baseUri, setBaseUri] = useState(repository.baseUri);
    const [credentialId, setCredentialId] = useState(repository.credentialId);

    const [nameErrorMessage, setNameErrorMessage] = useState<string|undefined>(undefined);
    const [baseUriErrorMessage, setBaseUriErrorMessage] = useState<string|undefined>(undefined);

    const handleSaveClick = () => {
        if (validateInputs(fields, (fieldName, result) => {
            switch (fieldName) {
                case "name": {
                    setNameErrorMessage(result);
                    break;
                }
                case "baseUri": {
                    setBaseUriErrorMessage(result);
                    break;
                }
            }
        })) {
            return;
        }

        const data: Repository = {
            id,
            enabled,
            type: repository.type,
            name,
            description,
            baseUri,
            credentialId
        }

        Rest.patch(auth, RestEndpoint.Repository, data)
            .then(() => enqueueSnackbar(t("successful-saved"), { variant: 'success'} ))
            .catch((err) => enqueueSnackbar("Saving data failed: " + err, { variant: 'error'} ));
    };

    return (
        <Grid container spacing={2} margin={2} onSubmit={handleSaveClick}>
            <FormFieldComponents id="name"
                                 value={name}
                                 errorMessage={nameErrorMessage}
                                 onChange={e => setName(e.target.value)}
                                 label={t("name")}
                                 autoFocus
                                 required
                                 gridSize={6}
            />
            <FormFieldComponents id={"description"}
                                 value={description}
                                 onChange={e => setDescription(e.target.value)}
                                 label={t("description")}
                                 gridSize={6}
            />

            <FormFieldComponents id={"baseUrl"}
                                 type={"url"}
                                 value={baseUri}
                                 errorMessage={baseUriErrorMessage}
                                 onChange={e => setBaseUri(e.target.value)}
                                 label={t("baseUrl")}
                                 required
                                 gridSize={6}
            />
            <FormFieldComponents id={"credentialId"}
                                 value={credentialId}
                                 errorMessage={baseUriErrorMessage}
                                 onChange={e => setCredentialId(e.target.value)}
                                 label={t("credentialId")}
                                 gridSize={6}
            />

            <FormFieldComponents id={"type"}
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

            <Grid size={12}>
                <Button
                    variant="contained"
                    onClick={handleSaveClick}
                >
                    {t("save")}
                </Button>
            </Grid>
        </Grid>
    );
}
