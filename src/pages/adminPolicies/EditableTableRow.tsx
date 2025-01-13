import {LicenseGroup, Policy, PolicyCondition, PolicyOperator, ViolationState} from "../../DTOs.ts";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import Grid from "@mui/material/Grid2";
import {validateRequiredText} from "../../Validators.ts";
import FormButtons from "../../components/FormButtons.tsx";
import FormTextField from "../../components/FormTextField.tsx";
import {FormCheckbox} from "../../components/FormCheckBox.tsx";
import {FormSelect, mapToKeyLabelItemArray} from "../../components/FormSelect.tsx";
import {Role} from "../../auth/Auth.tsx";
import PolicyConditionsList from "./PolicyConditionsList.tsx";

interface ComponentProps {
    policy: Policy
    licenseGroups: LicenseGroup[];
    onSaveClick: (data: Policy) => void;
    onDeleteRequest: () => void
}

export default function EditableTableRow({ policy, licenseGroups, onSaveClick, onDeleteRequest }: Readonly<ComponentProps>) {

    const { t } = useTranslation();

    const [id] = useState(policy.id);
    const [name, setName] = useState(policy.name);
    const [violationState, setViolationState] = useState<ViolationState>("FAIL");
    const [enabled, setEnabled] = useState(policy.enabled);
    const [operator, setOperator] = useState<PolicyOperator>(policy.operator);
    const [conditions, setConditions] = useState<PolicyCondition[]>(policy.conditions);

    const [nameErrorMessage, setNameErrorMessage] = useState<string|undefined>(undefined);

    const handleConditionsChanges = (newConditions: PolicyCondition[]) => {
        setConditions(newConditions);
    }

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
                           onChange={e => {
                               validateRequiredText(e.target.value, setNameErrorMessage);
                               setName(e.target.value);
                           }}
                           label={t("name")}
                           autoFocus
                           required
                           gridSize={6}
            />
            <FormSelect id="operator"
                        value={PolicyOperator[operator]}
                        label={t("operator")}
                        items={mapToKeyLabelItemArray(Object.keys(PolicyOperator))}
                        onChange={(e) => setOperator(PolicyOperator[e.target.value as keyof typeof PolicyOperator])}
                        gridSize={3}
            />
            <FormSelect id="violationState"
                        value={violationState}
                        label={t("violation-state")}
                        items={mapToKeyLabelItemArray(["FAIL", "WARN", "INFO"])}
                        onChange={(e) => setViolationState(e.target.value as ViolationState)}
                        gridSize={3}
            />

            <FormCheckbox id="enabled"
                          value={enabled}
                          label={t("enabled")}
                          onChange={e => setEnabled(e.target.checked)}
                          gridSize={12}
            />

            <PolicyConditionsList policyConditions={conditions}
                                  licenseGroups={licenseGroups}
                                  onConditionsChange={handleConditionsChanges} />

            <FormButtons roleRightButton={Role.POLICY_UPDATE}
                         roleLeftButton={Role.POLICY_DELETE}
                         onSaveClick={handleSaveClick}
                         onDeleteClick={onDeleteRequest}/>
        </Grid>
    );
}
