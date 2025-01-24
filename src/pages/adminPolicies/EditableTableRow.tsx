"use client"

import {LicenseGroup, Policy, PolicyCondition, PolicyOperator, ViolationState} from "@/DTOs.ts";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import Grid from "@mui/material/Grid2";
import {validateRequiredText} from "@/Validators.ts";
import {FormCheckbox} from "@components/FormCheckBox.tsx";
import {FormSelect, mapToKeyLabelItemArray} from "@components/FormSelect.tsx";
import {Role} from "@/auth/Role.ts";
import { FormTextField } from "@components/FormTextField.tsx";
import { FormButtons } from "@components/FormButtons.tsx";
import {PolicyConditionsList} from "./PolicyConditionsList.tsx";

interface ComponentProps {
    policy: Policy
    licenseGroups: LicenseGroup[];
    onSaveClick: (data: Policy) => void;
    onDeleteRequest: () => void
}

export const EditableTableRow = ({ policy, licenseGroups, onSaveClick, onDeleteRequest }: Readonly<ComponentProps>) => {

    const { t } = useTranslation();

    const [id] = useState(policy.id);
    const [name, setName] = useState(policy.name);
    const [violationState, setViolationState] = useState<ViolationState>(ViolationState.FAIL);
    const [enabled, setEnabled] = useState(policy.enabled);
    const [operator, setOperator] = useState<PolicyOperator>(policy.operator);
    const [conditions, setConditions] = useState<PolicyCondition[]>(policy.conditions);

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
            operator,
            conditions
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
            <FormSelect id="operator"
                        value={PolicyOperator[operator]}
                        label={t("operator")}
                        items={mapToKeyLabelItemArray(Object.keys(PolicyOperator))}
                        onChange={key => setOperator(PolicyOperator[key as keyof typeof PolicyOperator])}
                        gridSize={3}
            />
            <FormSelect id="violationState"
                        value={ViolationState[violationState]}
                        label={t("violation-state")}
                        items={mapToKeyLabelItemArray(Object.keys(ViolationState))}
                        onChange={key => setViolationState(ViolationState[key as keyof typeof ViolationState])}
                        gridSize={3}
            />

            <FormCheckbox id="enabled"
                          value={enabled}
                          label={t("enabled")}
                          onChange={setEnabled}
                          gridSize={12}
            />

            <PolicyConditionsList policyConditions={conditions}
                                  licenseGroups={licenseGroups}
                                  onConditionsChange={setConditions} />

            <FormButtons roleRightButton={Role.POLICY_UPDATE}
                         roleLeftButton={Role.POLICY_DELETE}
                         onSaveClick={handleSaveClick}
                         onDeleteClick={onDeleteRequest}/>
        </Grid>
    );
}
