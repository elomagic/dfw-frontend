import {Checkbox, FormControl, FormControlLabel, FormLabel, TextField} from "@mui/material";
import {HTMLInputTypeAttribute} from "react";
import {OutlinedInputProps} from "@mui/material/OutlinedInput";
import {SwitchBaseProps} from "@mui/material/internal/SwitchBase";
import Grid from "@mui/material/Grid2";

interface FormTextFieldProps {
    id: string;
    type?: HTMLInputTypeAttribute;
    value: string | undefined;
    errorMessage?: string;
    label: string;
    required?: boolean;
    autoFocus?: boolean;
    onChange?: OutlinedInputProps['onChange'];
    gridSize?: number;
}

/**
 *
 * @param id Id and name of the HTML input field
 * @param type Type of HTML input field. If missing, default "text"
 * @param value
 * @param errorMessage
 * @param onChange
 * @param label
 * @param required
 * @param autoFocus
 * @param gridSize If set, then form control will be wrapped by a grid with given size
 * @constructor
 */
export default function FormFieldComponents({ id, type, value, errorMessage, onChange, label, required, autoFocus, gridSize}: Readonly<FormTextFieldProps>) {

    return (
        <>
            { gridSize && (
                <Grid size={gridSize}>
                    <FormControl fullWidth>
                        <FormLabel htmlFor={id}>{label}</FormLabel>
                        <TextField
                            id={id}
                            name={id}
                            type={type ?? "text"}
                            value={value}
                            onChange={onChange}
                            fullWidth
                            required={required}
                            autoFocus={autoFocus}
                            variant="outlined"
                            error={errorMessage != undefined}
                            helperText={errorMessage}
                            color={errorMessage == undefined ? 'primary' : 'error'}
                            sx={{ ariaLabel: {label}}}
                        />
                    </FormControl>
                </Grid>
            )}
            { !gridSize && (
                <FormControl fullWidth>
                    <FormLabel htmlFor={id}>{label}</FormLabel>
                    <TextField
                        id={id}
                        name={id}
                        type={type ?? "text"}
                        value={value}
                        onChange={onChange}
                        fullWidth
                        required={required}
                        autoFocus={autoFocus}
                        variant="outlined"
                        error={errorMessage != undefined}
                        helperText={errorMessage}
                        color={errorMessage == undefined ? 'primary' : 'error'}
                        sx={{ ariaLabel: {label}}}
                    />
                </FormControl>
            )}
        </>
    );
}

interface FormCheckboxProps {
    id: string;
    value: boolean;
    label: string;
    onChange: SwitchBaseProps['onChange'];
    gridSize?: number;
}

/**
 *
 * @param id
 * @param value
 * @param onChange
 * @param label
 * @param gridSize If set, then form control will be wrapped by a grid with given size
 * @constructor
 */
export function FormCheckbox({ id, value, onChange, label, gridSize}: Readonly<FormCheckboxProps>) {

    return (
        <>
            { gridSize && (
                <Grid size={gridSize}>
                    <FormControl>
                        <FormControlLabel
                            control={<Checkbox onChange={onChange}/>}
                            id={id}
                            name={id}
                            checked={value}
                            label={label}
                        />
                    </FormControl>
                </Grid>
            )}
            { !gridSize && (
                <FormControl>
                    <FormControlLabel
                        control={<Checkbox onChange={onChange}/>}
                        id={id}
                        name={id}
                        checked={value}
                        label={label}
                    />
                </FormControl>
            )}
        </>
    );

}