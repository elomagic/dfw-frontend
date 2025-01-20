"use client"

import {License, LicenseGroup} from "../../DTOs.ts";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import Grid from "@mui/material/Grid2";
import {validateRequiredText} from "../../Validators.ts";
import FormButtons from "../../components/FormButtons.tsx";
import FormTextField from "../../components/FormTextField.tsx";
import FormSelectList from "../../components/FormSelectList.tsx";
import {Role} from "../../auth/Auth.tsx";

interface ComponentProps {
    licenseGroup: LicenseGroup;
    licenses: License[];
    onSaveClick: (data: LicenseGroup) => void;
    onDeleteRequest: () => void;
}

export default function EditableTableRow({ licenseGroup, licenses, onSaveClick, onDeleteRequest }: Readonly<ComponentProps>) {

    const { t } = useTranslation();

    const [id] = useState(licenseGroup.id);
    const [name, setName] = useState(licenseGroup.name);

    const [selectedLicenses, setSelectedLicenses] = useState<License[]>(licenseGroup.licenses ?? []);

    const [nameErrorMessage, setNameErrorMessage] = useState<string|undefined>(undefined);

    const handleSaveClick = () => {
        if (!validateRequiredText(name, setNameErrorMessage)) {
            return;
        }

        onSaveClick({
            id,
            name,
            licenses: selectedLicenses
        });
    };

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
            <FormSelectList<License>
                value={selectedLicenses}
                selectables={licenses}
                label={t("licenses")}
                editRole={Role.LICENSE_GROUP_UPDATE}
                gridSize={6}
                getItemId={(item: License) => item.licenseId ?? ""}
                getItemLabel={(item: License) => item.name}
                onChange={(items) => setSelectedLicenses(items)}
            />

            <FormButtons roleRightButton={Role.LICENSE_GROUP_UPDATE}
                         roleLeftButton={Role.LICENSE_GROUP_DELETE}
                         onSaveClick={handleSaveClick}
                         onDeleteClick={onDeleteRequest}/>
        </Grid>
    );
}
