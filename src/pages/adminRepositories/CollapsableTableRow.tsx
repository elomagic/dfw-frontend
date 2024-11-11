import TableCell from "@mui/material/TableCell";
import Grid from '@mui/material/Grid2';
import {Check} from "@mui/icons-material";
import TableRow from "@mui/material/TableRow";
import {Repository} from "../../DTOs.ts";
import RepositoryTypeIcon from "../../components/RepositoryTypeIcon.tsx";
import {Button, Checkbox, Collapse, FormControl, FormControlLabel, FormLabel, TextField} from "@mui/material";
import {useState} from "react";
import {useTranslation} from "react-i18next";

interface EditableTableRowProps {
    repository: Repository
}

export default function CollapsableTableRow({ repository }: Readonly<EditableTableRowProps>) {

    const { t } = useTranslation();
    const [open, setOpen] = useState<boolean>(false);
    const [nameError, setNameError] = useState<boolean>(false);
    const [nameErrorMessage, setNameErrorMessage] = useState<string>("");

    const validateInputs = () => {
        console.log("validateInputs");
        setNameError(false);
        setNameErrorMessage("");
    };

    return (
        <>
            <TableRow
                key={repository.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={()=> setOpen(!open)}
            >
                <TableCell><RepositoryTypeIcon type={repository.type} /></TableCell>
                <TableCell>{repository.name}</TableCell>
                <TableCell>{repository.enabled ? <Check color="success" /> : ""}</TableCell>
                <TableCell>{repository.description}</TableCell>
                <TableCell>{repository.baseUri}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Grid container spacing={2} margin={2}>
                            <Grid size={6}>
                                <FormControl fullWidth>
                                    <FormLabel htmlFor="name">{t("name")}</FormLabel>
                                    <TextField
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
                    </Collapse>
                </TableCell>

            </TableRow>
        </>
    );
}
