"use client"

import {useTranslation} from "react-i18next";
import {useState} from "react";
import Grid from "@mui/material/Grid2";
import {validateRequiredText} from "../../../Validators.ts";
import {UserAccount} from "../../../DTOs.ts";
import FormButtons from "../../../components/FormButtons.tsx";
import FormTextField from "../../../components/FormTextField.tsx";
import {FormCheckbox} from "../../../components/FormCheckBox.tsx";
import {FormSelect} from "../../../components/FormSelect.tsx";
import {Role} from "../../../auth/Auth.tsx";

interface ComponentProps {
    user: UserAccount
    onSaveClick: (data: UserAccount) => void;
    onDeleteRequest: () => void
}

export default function EditableTableRow({ user, onSaveClick, onDeleteRequest }: Readonly<ComponentProps>) {

    const { t } = useTranslation();

    const [mailAddress] = useState(user.mailAddress);
    const [displayName, setDisplayName] = useState(user.displayName);
    const [language, setLanguage] = useState(user.language);
    const [enabled, setEnabled] = useState(user.enabled);
    const [changePassword, setChangePassword] = useState(user.changePassword);

    const [displayNameErrorMessage, setDisplayNameErrorMessage] = useState<string|undefined>(undefined);

    const handleSaveClick = () => {
        if (!validateRequiredText(displayName, setDisplayNameErrorMessage)) {
            return;
        }

        onSaveClick({id: user.id, mailAddress, displayName, language, enabled, changePassword});
    };

    return (
        <Grid container spacing={2} marginTop={2} marginBottom={2}>
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

            <FormCheckbox id="enabled"
                          value={enabled}
                          label={t("enabled")}
                          onChange={setEnabled}
                          gridSize={6}
            />
            <FormCheckbox id="changePassword"
                          value={changePassword}
                          label={t("change-password")}
                          onChange={setChangePassword}
                          gridSize={6}
            />

            <FormSelect id="language"
                        value={language ?? "en"}
                        label={t("language")}
                        items={[
                            { "key": "en", "label": t("english") },
                            { "key": "de", "label": t("german") },
                        ]}
                        onChange={setLanguage}
                        gridSize={6}
            />

            <FormButtons roleLeftButton={Role.USERACCOUNT_UPDATE}
                         roleRightButton={Role.USERACCOUNT_DELETE}
                         onSaveClick={handleSaveClick}
                         onDeleteClick={onDeleteRequest}
            />
        </Grid>
    );
}
