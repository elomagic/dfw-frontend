import {Repository} from "../../DTOs.ts";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {Button, Checkbox, FormControl, FormControlLabel, FormLabel, TextField} from "@mui/material";
import Grid from "@mui/material/Grid2";

interface EditableTableRowProps {
    repository: Repository
}

export default function EditableTableRow({ repository }: Readonly<EditableTableRowProps>) {

    const { t } = useTranslation();
    const [nameError, setNameError] = useState<boolean>(false);
    const [nameErrorMessage, setNameErrorMessage] = useState<string>("");

    const validateInputs = () => {
        console.log("validateInputs");
        setNameError(false);
        setNameErrorMessage("");
    };

    return (
        <Grid container spacing={2} margin={2}>
            <Grid size={6}>
                <FormControl fullWidth>
                    <FormLabel htmlFor="name">{t("name")}</FormLabel>
                    <TextField
                        defaultValue={repository.name}
                        error={nameError}
                        helperText={nameErrorMessage}
                        id="name"
                        type="text"
                        name="name"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={nameError ? 'error' : 'primary'}
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
                    type="submit"
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
