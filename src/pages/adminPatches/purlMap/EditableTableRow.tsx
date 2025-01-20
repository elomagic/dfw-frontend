"use client"

import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid2";
import {validateRequiredText} from "../../../Validators.ts";
import * as Rest from "../../../RestClient.ts";
import {useAuth} from "../../../auth/useAuth.ts";
import {License, LicensePurlMap} from "../../../DTOs.ts";
import FormButtons from "../../../components/FormButtons.tsx";
import FormTextField from "../../../components/FormTextField.tsx";
import {FormSelect, KeyLabelItem} from "../../../components/FormSelect.tsx";
import FormTextArea from "../../../components/FormTextArea.tsx";
import {Role} from "../../../auth/Auth.tsx";
import { toaster } from "../../../Toaster.ts";

interface ComponentProps {
    purlMap: LicensePurlMap
    onSaveClick: (data: LicensePurlMap) => void;
    onDeleteRequest: () => void;
}

export default function EditableTableRow({ purlMap, onDeleteRequest, onSaveClick }: Readonly<ComponentProps>) {

    const { t } = useTranslation();
    const auth = useAuth();

    const [id] = useState(purlMap.id);
    const [purlMatch, setPurlMatch] = useState<string>(purlMap.purlMatch);
    const [spdxId, setSpdxId] = useState<string>(purlMap.spdxId);
    const [comment, setComment] = useState<string|undefined>(purlMap.comment);

    const [spdxList, setSpdxList] = useState<KeyLabelItem[]>([]);

    const [purlErrorMessage, setPurlErrorMessage] = useState<string|undefined>(undefined);

    useEffect(() => {
        Rest.get<License[]>(auth, Rest.RestEndpoint.License)
            .then((rs: License[]) => rs.map(l => { return { "key": l.licenseId, "label": l.name} as KeyLabelItem })) // setSpdxList(rs))
            .then((kl: KeyLabelItem[]) => setSpdxList(kl))
            .catch((err: Error) => toaster("Getting spdx list failed: " + err.message, 'error'));
    }, [auth]);

    const handleSaveClick = () => {
        if (!validateRequiredText(purlMatch, setPurlErrorMessage)) {
            return;
        }

        onSaveClick({id, purlMatch, spdxId, comment});
    };

    return (
        <Grid container spacing={2} marginTop={2} marginBottom={2}>
            <FormTextField id="purlMatch"
                                 value={purlMatch}
                                 errorMessage={purlErrorMessage}
                                 onChange={setPurlMatch}
                                 label={t("purl-match")}
                                 autoFocus
                                 required
                                 gridSize={6}
            />

            <FormSelect id="spdxId"
                        value={spdxId}
                        label={t("spdx-id")}
                        items={spdxList}
                        onChange={setSpdxId}
                        gridSize={6}
            />

            <FormTextArea id="comment"
                          value={comment}
                          label={t("comment")}
                          minRows={6}
                          onChange={setComment}
                          gridSize={6}
            />

            <FormButtons roleLeftButton={Role.LICENSE_PURL_MAP_UPDATE}
                         roleRightButton={Role.LICENSE_PURL_MAP_DELETE}
                         onSaveClick={handleSaveClick}
                         onDeleteClick={onDeleteRequest}
            />
        </Grid>
    );
}
