import {Policy, ViolationState} from "../../DTOs.ts";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import Grid from "@mui/material/Grid2";
import {validateRequiredText} from "../../Validators.ts";
import FormButtons from "../../components/FormButtons.tsx";
import FormTextField from "../../components/FormTextField.tsx";
import {FormCheckbox} from "../../components/FormCheckBox.tsx";
import {FormSelect, mapToKeyLabelItemArray} from "../../components/FormSelect.tsx";
import {Role} from "../../auth/Auth.tsx";

interface EditableTableRowProps {
    policy: Policy
    onSaveClick: (data: Policy) => void;
    onDeleteRequest: () => void
}

export default function EditableTableRow({ policy, onSaveClick, onDeleteRequest }: Readonly<EditableTableRowProps>) {

    const { t } = useTranslation();

    const [id] = useState(policy.id);
    const [name, setName] = useState(policy.name);
    const [violationState, setViolationState] = useState<ViolationState>("FAIL");
    const [enabled, setEnabled] = useState(policy.enabled);

    const [nameErrorMessage, setNameErrorMessage] = useState<string|undefined>(undefined);

    const handleSaveClick = () => {
        if (!validateRequiredText(name, setNameErrorMessage)) {
            return;
        }

        onSaveClick({
            id,
            enabled,
            name,
            violationState,
            conditions: []
        });
    };

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
            <FormSelect id="violationState"
                        value={violationState}
                        label={t("violation-state")}
                        items={mapToKeyLabelItemArray(["FAIL", "WARN", "INFO"])}
                        onChange={(e) => setViolationState(e.target.value as ViolationState)}
                        gridSize={6}
            />

            <FormCheckbox id="enabled"
                          value={enabled}
                          label={t("enabled")}
                          onChange={e => setEnabled(e.target.checked)}
                          gridSize={12}
            />

            <FormButtons roleRightButton={Role.POLICY_UPDATE}
                         roleLeftButton={Role.POLICY_DELETE}
                         onSaveClick={handleSaveClick}
                         onDeleteClick={onDeleteRequest}/>
        </Grid>
    );
}
