"use client"

import {useState} from "react";
import {useTranslation} from "react-i18next";
import Grid from "@mui/material/Grid2";
import {validateRequiredText} from "@/Validators.ts";
import {Role} from "@/auth/Role.ts";
import {FormTextField} from "@components/FormTextField.tsx";
import { FormButtons } from "@components/FormButtons.tsx";
import {FormTextArea} from "@components/FormTextArea.tsx";
import {LicenseNameMap} from "@/DTOs.ts";
import {FormSpdxSelect} from "@/pages/adminPatches/FormSpdxSelect.tsx";

interface ComponentProps {
    nameMap: LicenseNameMap,
    onSaveClick: (data: LicenseNameMap) => void;
    onDeleteRequest: () => void
}

export const EditableTableRow = ({ nameMap, onSaveClick, onDeleteRequest }: Readonly<ComponentProps>) => {

    const { t } = useTranslation();

    const [id] = useState(nameMap.id);
    const [nameMatch, setNameMatch] = useState<string>(nameMap.nameMatch);
    const [spdxId, setSpdxId] = useState<string>(nameMap.spdxId);
    const [comment, setComment] = useState<string|undefined>(nameMap.comment);

    const [nameErrorMessage, setNameErrorMessage] = useState<string|undefined>(undefined);

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
            <FormSpdxSelect value={spdxId} onChange={setSpdxId} gridSize={6} />

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
