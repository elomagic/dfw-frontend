"use client"

import {ConditionOperator, ConditionType, ItemId, LicenseGroup, PolicyCondition} from "../../DTOs.ts";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../auth/useAuth.ts";
import {useState} from "react";
import {Button, List} from "@mui/material";
import {Fieldset} from "../../components/Fieldset.tsx";
import Grid from "@mui/material/Grid2";
import {Add} from "@mui/icons-material";
import {Role} from "../../auth/Auth.tsx";
import PolicyConditionRow from "./PolicyConditionRow.tsx";
import {v4 as uuidv4} from "uuid";

interface ComponentProps {
    policyConditions: PolicyCondition[];
    licenseGroups: LicenseGroup[];
    onConditionsChange: (r: PolicyCondition[]) => void;
}

export default function PolicyConditionsList({ policyConditions, licenseGroups, onConditionsChange }: Readonly<ComponentProps>) {

    const { t } = useTranslation();
    const auth = useAuth();
    const [data, setData] = useState<ItemId<PolicyCondition>[]>(policyConditions.map(item => ({ ...item, _itemId: uuidv4() })));

    const handleCreateClick = () => {

        const newCondition: ItemId<PolicyCondition> = {
            _itemId: uuidv4(),
            condition: ConditionType.SEVERITY,
            operator: ConditionOperator.GREATER_THAN,
            conditionalValue: "5"
        }

        const d = [...data];

        d.push(newCondition)
        setData(d)

        onConditionsChange(d);

    }

    const handleChange = (e: ItemId<PolicyCondition>) => {

        const item = data.find((i) => i._itemId === e._itemId);
        if (!item) return;

        item.condition = e.condition;
        item.operator = e.operator;
        item.conditionalValue = e.conditionalValue;

        setData([...data]);

        onConditionsChange(data);

    }

    const handleDeleteClick = (e: ItemId<PolicyCondition>) => {
        const na = data.filter((i) => i._itemId !== e._itemId);
        setData(na);

        onConditionsChange(na);
    }

    return (
        <Grid size={12}>
            <Fieldset label="Conditions">
                <List sx={{width: '100%', overflow: "auto"}}>
                    {data.map((r) =>
                        <PolicyConditionRow key={r._itemId}
                                            policyCondition={r}
                                            licenseGroups={licenseGroups}
                                            onConditionChange={(c) => handleChange(c)}
                                            onConditionDelete={(c) => handleDeleteClick(c)}
                        />)
                    }
                </List>
                { (auth.roles.includes(Role.POLICY_UPDATE)) &&
                    <Button variant="outlined"
                            onClick={handleCreateClick}
                            size="small"
                            startIcon={<Add />}
                            sx={{ mt: "8px", mb: "8px" }}>
                        {t("create")}
                    </Button>
                }
            </Fieldset>
        </Grid>
    );
}
