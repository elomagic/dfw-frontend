"use client"

import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid2";
import {validateRequiredText} from "../../../Validators.ts";
import * as Rest from "../../../RestClient.ts";
import {useAuth} from "../../../auth/useAuth.ts";
import {License, LicenseNameMap} from "../../../DTOs.ts";
import {FormSelect, KeyLabelItem} from "../../../components/FormSelect.tsx";
import {Role} from "../../../auth/Auth.tsx";
import { toaster } from "../../../Toaster.ts";
import {FormTextField} from "../../../components/FormTextField.tsx";
import { FormButtons } from "../../../components/FormButtons.tsx";
import {FormTextArea} from "../../../components/FormTextArea.tsx";

interface ComponentProps {
    nameMap: LicenseNameMap,
    onSaveClick: (data: LicenseNameMap) => void;
    onDeleteRequest: () => void
}

export const EditableTableRow = ({ nameMap, onSaveClick, onDeleteRequest }: Readonly<ComponentProps>) => {

    const { t } = useTranslation();
    const auth = useAuth();

    const [id] = useState(nameMap.id);
    const [nameMatch, setNameMatch] = useState<string>(nameMap.nameMatch);
    const [spdxId, setSpdxId] = useState<string>(nameMap.spdxId);
    const [comment, setComment] = useState<string|undefined>(nameMap.comment);

    const [spdxList, setSpdxList] = useState<KeyLabelItem[]>([]);

    const [nameErrorMessage, setNameErrorMessage] = useState<string|undefined>(undefined);

    useEffect(() => {
        Rest.get<License[]>(auth, Rest.Endpoint.License)
            .then((rs: License[]) => rs.map(l => { return { "key": l.licenseId, "label": l.name} as KeyLabelItem })) // setSpdxList(rs))
            .then((kl: KeyLabelItem[]) => setSpdxList(kl))
            .catch((err: Error) => toaster("Getting spdx list failed: " + err.message, 'error'));
    }, [auth]);

    const handleSaveClick = () => {
        if (!validateRequiredText(nameMatch, setNameErrorMessage)) {
            return;
        }

        onSaveClick({id, nameMatch, spdxId, comment});
    };

    return (
        <Grid container spacing={2} marginTop={2} marginBottom={2}>
            <FormTextField id="nameMatch"
                           value={nameMatch}
                           errorMessage={nameErrorMessage}
                           onChange={setNameMatch}
                           label={t("name-match")}
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
                          maxRows={6}
                          onChange={setComment}
                          gridSize={6}
            />

            <FormButtons roleLeftButton={Role.LICENSE_NAME_MAP_UPDATE}
                         roleRightButton={Role.LICENSE_NAME_MAP_DELETE}
                         onSaveClick={handleSaveClick}
                         onDeleteClick={onDeleteRequest}
            />
        </Grid>
    );
}
