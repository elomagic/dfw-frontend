"use client"

import {PolicyViolation} from "../../DTOs.ts";
import {useTranslation} from "react-i18next";
import Grid from "@mui/material/Grid2";
import FormButtons from "../../components/FormButtons.tsx";
import FormTextField from "../../components/FormTextField.tsx";

interface ComponentProps {
    policyViolation: PolicyViolation
    onDeleteRequest: () => void
}

export default function PolicyViolationTableRow({ policyViolation, onDeleteRequest }: Readonly<ComponentProps>) {

    const { t } = useTranslation();

    return (
        <Grid container spacing={2} marginTop={2} marginBottom={2}>
            <FormTextField id="name"
                           value={policyViolation.component.name}
                           label={t("name")}
                           readOnly
                           gridSize={6}
            />
            <FormTextField id="purl"
                           value={policyViolation.component.purl}
                           label={t("purl")}
                           readOnly
                           gridSize={6}
            />
            <FormTextField id="licenses"
                           value={policyViolation.component.licenses.join(", ")}
                           label={t("licenses")}
                           readOnly
                           gridSize={12}
            />
            {/* Create exception button */}
            <FormButtons onDeleteClick={onDeleteRequest} />
        </Grid>
    );
}
