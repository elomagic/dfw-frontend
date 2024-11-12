import {useTranslation} from "react-i18next";
import {useState} from "react";
import {Button} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {FormFieldProperty, validateInputs} from "../../../FormFieldProperties.ts";
import FormFieldComponents from "../../../components/FormFieldComponents.tsx";
import * as Rest from "../../../RestClient.ts";
import {RestEndpoint} from "../../../RestClient.ts";
import {useAuth} from "../../../auth/useAuth.ts";
import {UserAccountGroup} from "../../../DTOs.ts";
import {enqueueSnackbar} from "notistack";

const fields: FormFieldProperty[] = [
    { name : "name", minLength: 1 },
];

interface EditableTableRowProps {
    group: UserAccountGroup
}

export default function EditableTableRow({ group }: Readonly<EditableTableRowProps>) {

    const { t } = useTranslation();
    const auth = useAuth();

    const [id] = useState(group.id);
    const [name, setName] = useState(group.name);

    const [nameErrorMessage, setNameErrorMessage] = useState<string|undefined>(undefined);

    const handleSaveClick = () => {
        if (validateInputs(fields, (fieldName, result) => {
            switch (fieldName) {
                case "name": {
                    setNameErrorMessage(result);
                    break;
                }
            }
        })) {
            return;
        }

        const data: UserAccountGroup = {
            id,
            name,
            permissions: [],
            userAccounts: []
        }

        Rest.patch(auth, RestEndpoint.UserGroup, data)
            .then(() => enqueueSnackbar("Successful saved", { variant: 'success'} ))
            .catch((err) => enqueueSnackbar("Saving data failed: " + err, { variant: 'error'} ));
    };

    return (
        <Grid container spacing={2} margin={2} onSubmit={handleSaveClick}>
            <FormFieldComponents id="name"
                                 value={name}
                                 errorMessage={nameErrorMessage}
                                 onChange={e => setName(e.target.value)}
                                 label={t("name")}
                                 autoFocus
                                 required
                                 gridSize={6}
            />

            <Grid size={12}>
                <Button
                    variant="contained"
                    onClick={handleSaveClick}
                >
                    {t("save")}
                </Button>
            </Grid>
        </Grid>
    );
}
