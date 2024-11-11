import {Repository} from "../../DTOs.ts";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {Button, Checkbox, FormControl, FormControlLabel, FormLabel, TextField} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {FormFieldProperty} from "../../FormFieldProperties.ts";

interface EditableTableRowProps {
    repository: Repository
}

const fields: FormFieldProperty[] = [
    { name : "name", type: "text", minLength: 1 },
];

export default function EditableTableRow({ repository }: Readonly<EditableTableRowProps>) {

    const { t } = useTranslation();
    const [nameErrorMessage, setNameErrorMessage] = useState<string|undefined>(undefined);

    const handleSaveClick = () => {
        const name = document.getElementById('name') as HTMLInputElement;

        console.log("save" + name);
    };

    const validateInputs = () => {
        for (const field of fields) {
            const value = document.getElementById(field.name) as HTMLInputElement;
            if (field.minLength > 0 && value.value.length === 0) {
                setNameErrorMessage(field.name + ' must be set');
                return;
            }
        }

        const name = document.getElementById('name') as HTMLInputElement;

        if (!name.value || name.value.length == 0) {
            setNameErrorMessage('Name must be set');
        } else {
            setNameErrorMessage(undefined);
        }
    };

    return (
        <Grid container spacing={2} margin={2} onSubmit={handleSaveClick}>
            <Grid size={6}>
                <FormControl fullWidth>
                    <FormLabel htmlFor="name">{t("name")}</FormLabel>
                    <TextField
                        defaultValue={repository.name}
                        error={nameErrorMessage != undefined}
                        helperText={nameErrorMessage}
                        id="name"
                        type="text"
                        name="name"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={nameErrorMessage == undefined ? 'primary' : 'error'}
                        sx={{ ariaLabel: 'name' }}
                    />
                </FormControl>
            </Grid>

            <Grid size={6}>
                <FormControl fullWidth>
                    <FormLabel htmlFor="description">{t("description")}</FormLabel>
                    <TextField
                        name="description"
                        type="text"
                        id="description"
                        fullWidth
                        variant="outlined"
                    />
                </FormControl>
            </Grid>

            <Grid size={6}>
                <FormControl fullWidth>
                    <FormLabel htmlFor="baseUrl">{t("baseUrl")}</FormLabel>
                    <TextField
                        name="baseUrl"
                        type="url"
                        id="baseUrl"
                        fullWidth
                        variant="outlined"
                    />
                </FormControl>
            </Grid>

            <Grid size={12}>
                <FormControl>
                    <FormControlLabel
                        control={<Checkbox />}
                        name="enabled"
                        id="enabled"
                        label={t("enabled")}
                    />
                </FormControl>
            </Grid>

            <Grid size={12}>
                <Button
                    type={"submit"}
                    fullWidth
                    variant="contained"
                    onClick={validateInputs}
                >
                    {t("save")}
                </Button>
            </Grid>
        </Grid>
    );
}
