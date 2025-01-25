"use client"

import {useTranslation} from "react-i18next";
import {useState} from "react";
import Grid from "@mui/material/Grid2";
import {validateRequiredText} from "@/Validators.ts";
import {Role} from "@/auth/Role.ts";
import { FormTextField } from "@components/FormTextField.tsx";
import { FormButtons } from "@components/FormButtons.tsx";
import {FormTextArea} from "@components/FormTextArea.tsx";
import {LicensePurlMap} from "@/DTOs.ts";
import {FormSpdxSelect} from "@/pages/adminPatches/FormSpdxSelect.tsx";

interface ComponentProps {
    purlMap: LicensePurlMap
    onSaveClick: (data: LicensePurlMap) => void;
    onDeleteRequest: () => void;
}

export const EditableTableRow = ({ purlMap, onDeleteRequest, onSaveClick }: Readonly<ComponentProps>) => {

    const { t } = useTranslation();
    const [id] = useState(purlMap.id);
    const [purlMatch, setPurlMatch] = useState<string>(purlMap.purlMatch);
    const [spdxId, setSpdxId] = useState<string>(purlMap.spdxId);
    const [comment, setComment] = useState<string|undefined>(purlMap.comment);

    const [purlErrorMessage, setPurlErrorMessage] = useState<string|undefined>(undefined);

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
            <FormSpdxSelect value={spdxId} onChange={setSpdxId} gridSize={6}/>

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
