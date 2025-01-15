import {ConditionOperator, ConditionType, LicenseGroup, PolicyCondition} from "../../DTOs.ts";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../auth/useAuth.ts";
import {useState} from "react";
import {Box, IconButton} from "@mui/material";
import {FormSelect, KeyLabelItem, mapToKeyLabelItemArray} from "../../components/FormSelect.tsx";
import {Role} from "../../auth/Auth.tsx";
import {DeleteForever} from "@mui/icons-material";
import FormTextField from "../../components/FormTextField.tsx";
import Grid from "@mui/material/Grid2";

const getValueType = (value: ConditionType) => {
    if (value === ConditionType.SEVERTITY || value === ConditionType.AGE) {
        return "number";
    } else {
        return "text";
    }
}

const getOperator = (value: ConditionType) => {
    switch (value) {
        case ConditionType.AGE:
            return mapToKeyLabelItemArray(["GREATER_THAN", "SMALLER_THAN"]);
        case ConditionType.LICENSE_GROUP:
            return mapToKeyLabelItemArray(["IN", "NOT_IN"]);
        case ConditionType.SEVERTITY:
            return mapToKeyLabelItemArray(["GREATER_THAN", "IS", "IS_NOT", "SMALLER_THAN"]);
    }
}

interface ComponentProps {
    policyCondition: PolicyCondition;
    licenseGroups: LicenseGroup[];
    onConditionChange: (r: PolicyCondition) => void;
    onConditionDelete: (r: PolicyCondition) => void;
}

export default function PolicyConditionRow({ policyCondition, licenseGroups, onConditionChange, onConditionDelete }: Readonly<ComponentProps>) {

    const { t } = useTranslation();
    const auth = useAuth();
    const [data, setData] = useState<PolicyCondition>(policyCondition);
    const [valueType, setValueType] = useState<"text"|"number">(getValueType(data.condition));

    const handleConditionChanged = (value: ConditionType) => {
        setValueType(getValueType(value));

        setData({ ...data, condition: value });

        onConditionChange(data);
    }

    const handleOperatorChanged = (value: ConditionOperator) => {
        // todo validate
        setData({ ...data, operator: value });

        onConditionChange(data);
    }

    const handleValueChanged = (value: string) => {
        // todo validate
        setData({ ...data, conditionalValue: value });

        onConditionChange(data);
    }

    return (
        <Grid container spacing={2} sx={{ p: 1, m: "0 0 4px 0 ", backgroundColor: "#292929"}}>

            <FormSelect id="condition"
                        value={data.condition}
                        label={t("condition")}
                        items={mapToKeyLabelItemArray(Object.keys(ConditionType))}
                        gridSize={3}
                        onChange={(e) => handleConditionChanged(ConditionType[e.target.value as keyof typeof ConditionType])}
            />

            <FormSelect id="operator"
                        value={data.operator}
                        label={t("operator")}
                        gridSize={3}
                        items={getOperator(data.condition)}
                        onChange={(e) => handleOperatorChanged(ConditionOperator[e.target.value as keyof typeof ConditionOperator])}
            />

            {data.condition !== "LICENSE_GROUP" &&
                <FormTextField id="conditionalValue"
                               value={data.conditionalValue}
                               label={t("value")}
                               type={valueType}
                               gridSize={3}
                               onChange={(e) => handleValueChanged(e.target.value)}
                />
            }
            {data.condition === "LICENSE_GROUP" &&
                <FormSelect id="conditionalValue"
                            value={data.conditionalValue}
                            label={t("license-group")}
                            gridSize={3}
                            items={licenseGroups.map(i => { return { key: i.id, label: i.name } as KeyLabelItem})}
                            onChange={(e) => handleValueChanged(e.target.value as string)}
                />
            }

            <Box sx={{ flexGrow: 1 }}/>

            {auth.roles.includes(Role.POLICY_UPDATE) && <IconButton onClick={() => onConditionDelete(data)}><DeleteForever color={"error"}/></IconButton>}

        </Grid>

    );
}
