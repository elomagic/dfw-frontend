import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid2";
import {validateInputs} from "../../../FormFieldProperties.ts";
import * as Rest from "../../../RestClient.ts";
import {useAuth} from "../../../auth/useAuth.ts";
import {License, LicensePurlMap} from "../../../DTOs.ts";
import {enqueueSnackbar} from "notistack";
import FormButtons from "../../../components/FormButtons.tsx";
import FormTextField from "../../../components/FormTextField.tsx";
import {FormFieldValidationProperty} from "../../../components/FormBuilder.ts";
import {FormSelect, KeyLabelItem} from "../../../components/FormSelect.tsx";

const fields: FormFieldValidationProperty[] = [
    { name : "purlMatch", minLength: 1 },
    { name : "spdxId", minLength: 1 },
];

interface EditableTableRowProps {
    purlMap: LicensePurlMap
    onSaveClick: (data: LicensePurlMap) => void;
    onDeleteRequest: () => void;
}

export default function EditableTableRow({ purlMap, onDeleteRequest, onSaveClick }: Readonly<EditableTableRowProps>) {

    const { t } = useTranslation();
    const auth = useAuth();

    const [id] = useState(purlMap.id);
    const [purlMatch, setPurlMatch] = useState<string>(purlMap.purlMatch);
    const [spdxId, setSpdxId] = useState<string>(purlMap.spdxId);
    const [spdxList, setSpdxList] = useState<KeyLabelItem[]>([]);

    const [purlErrorMessage, setPurlErrorMessage] = useState<string|undefined>(undefined);

    useEffect(() => {
        Rest.get(auth, Rest.RestEndpoint.License)
            .then((res) => res.json())
            .then((rs: License[]) => rs.map(l => { return { "key": l.licenseId, "label": l.name} as KeyLabelItem })) // setSpdxList(rs))
            .then((kl: KeyLabelItem[]) => setSpdxList(kl))
            .catch((err: Error) => enqueueSnackbar("Getting spdx list failed: " + err.message, { variant: 'error'} ));
    }, [auth]);

    const handleSaveClick = () => {
        if (validateInputs(fields, (fieldName, result) => {
            switch (fieldName) {
                case "purlMatch": {
                    setPurlErrorMessage(result);
                    break;
                }
            }
        })) {
            return;
        }

        onSaveClick({id, purlMatch, spdxId});
    };

    return (
        <Grid container spacing={2} marginTop={2} marginBottom={2}>
            <FormTextField id="purlMatch"
                                 value={purlMatch}
                                 errorMessage={purlErrorMessage}
                                 onChange={e => setPurlMatch(e.target.value)}
                                 label={t("purl-match")}
                                 autoFocus
                                 required
                                 gridSize={6}
            />

            <FormSelect id="spdxId"
                        value={spdxId}
                        label={t("spdx-id")}
                        items={spdxList}
                        onChange={(e) => setSpdxId(e.target.value as string)}
                        gridSize={6}
            />

            <FormButtons onSaveClick={handleSaveClick} onDeleteClick={onDeleteRequest}/>
        </Grid>
    );
}
