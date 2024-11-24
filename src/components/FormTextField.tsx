import {HTMLInputTypeAttribute, ReactNode} from "react";
import {OutlinedInputProps} from "@mui/material/OutlinedInput";
import Grid from "@mui/material/Grid2";
import {FormControl, TextField} from "@mui/material";
import {GridSize} from "@mui/material/Grid2/Grid2";

interface FormTextFieldProps {
    id: string;
    type?: HTMLInputTypeAttribute;
    value: string | undefined;
    errorMessage?: string;
    label: string;
    required?: boolean;
    autoFocus?: boolean;
    onChange?: OutlinedInputProps['onChange'];
    gridSize?: GridSize;
    readOnly?: boolean;
    startAdornment?: ReactNode;
}

function UnwrappedTextField({id, type, value, errorMessage, onChange, label, required, autoFocus, readOnly, startAdornment}: Readonly<FormTextFieldProps>) {

    return (
        <FormControl fullWidth>
            <TextField
                id={id}
                name={id}
                type={type ?? "text"}
                value={value}
                label={label}
                onChange={onChange}
                fullWidth
                required={required}
                autoFocus={autoFocus}
                variant="outlined"
                error={errorMessage != undefined}
                helperText={errorMessage}
                color={errorMessage == undefined ? 'primary' : 'error'}
                sx={{ ariaLabel: {label}}}
                slotProps={{
                    input: {
                        readOnly: readOnly,
                        startAdornment: startAdornment
                    },
                }}
            />
        </FormControl>
    );
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
 * @param readOnly
 * @param startAdornment
 * @constructor
 */
export default function FormTextField({id, type, value, errorMessage, onChange, label, required, autoFocus, gridSize, readOnly, startAdornment}: Readonly<FormTextFieldProps>) {

    return (
        <>
            { gridSize && (
                <Grid size={gridSize}>
                    <UnwrappedTextField
                        id={id}
                        value={value}
                        type={type}
                        label={label}
                        onChange={onChange}
                        readOnly={readOnly}
                        startAdornment={startAdornment}
                        autoFocus={autoFocus}
                        required={required}
                        errorMessage={errorMessage}
                    />
                </Grid>
            )}
            { !gridSize && (
                <UnwrappedTextField
                    id={id}
                    value={value}
                    type={type}
                    label={label}
                    onChange={onChange}
                    readOnly={readOnly}
                    startAdornment={startAdornment}
                    autoFocus={autoFocus}
                    required={required}
                    errorMessage={errorMessage}
                />
            )}
        </>
    );
}
