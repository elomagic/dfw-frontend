import {LicenseViolation} from "../../DTOs.ts";
import {useTranslation} from "react-i18next";
import Grid from "@mui/material/Grid2";
import FormButton from "../../components/FormButton.tsx";
import FormTextField from "../../components/FormTextField.tsx";

interface EditableTableRowProps {
    licenseViolation: LicenseViolation
    onDeleteRequest: () => void
}

export default function LicenseIssueTableRow({ licenseViolation, onDeleteRequest }: Readonly<EditableTableRowProps>) {

    const { t } = useTranslation();

    return (
        <Grid container spacing={2} marginTop={2} marginBottom={2}>
            <FormTextField id="purl"
                           value={licenseViolation.purl}
                           label={t("purl")}
                           readOnly
                           gridSize={6}
            />
            <FormTextField id={"description"}
                           value={licenseViolation.licenses.join(", ")}
                           label={t("licenses")}
                           readOnly
                           gridSize={6}
            />

            <FormButton onDeleteClick={onDeleteRequest}/>
        </Grid>
    );
}
