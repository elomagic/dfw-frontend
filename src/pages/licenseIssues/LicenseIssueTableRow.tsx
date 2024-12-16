import {LicenseViolation} from "../../DTOs.ts";
import {useTranslation} from "react-i18next";
import FormButtons from "../../components/FormButtons.tsx";
import FormTextField from "../../components/FormTextField.tsx";
import {useState} from "react";
import CreatePurlMapDialog from "../adminLicenses/purlMap/CreatePurlMapDialog.tsx";
import {Grid} from "../../components/Grids.tsx";

interface EditableTableRowProps {
    licenseViolation: LicenseViolation
    onDeleteRequest: () => void
}

export default function LicenseIssueTableRow({ licenseViolation, onDeleteRequest }: Readonly<EditableTableRowProps>) {

    const { t } = useTranslation();
    const [ createOpen, setCreateOpen ] = useState<boolean>(false);

    return (
        <Grid>
            <FormTextField id="purl"
                           value={licenseViolation.purl}
                           label={t("purl")}
                           readOnly
                           gridSize={6}
            />
            <FormTextField id="description"
                           value={licenseViolation.licenses.join(", ")}
                           label={t("licenses")}
                           readOnly
                           gridSize={6}
            />
            {/* Create exception button */}
            <FormButtons onSaveClick={() => setCreateOpen(true)}
                         labelLeftButton={t("create-exception-rule")}
                         onDeleteClick={onDeleteRequest}
            />
            <CreatePurlMapDialog open={createOpen} handleClose={() => setCreateOpen(false)} />
        </Grid>
    );
}
