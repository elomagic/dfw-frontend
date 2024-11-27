import {OutlinedInputProps} from "@mui/material/OutlinedInput";
import Grid from "@mui/material/Grid2";
import {FormControl, TextareaAutosize, TextField} from "@mui/material";
import {GridSize} from "@mui/material/Grid2/Grid2";

interface FormTextAreaProps {
    id: string;
    minRows?: number | string;
    maxRows?: number | string;
    value: string | undefined;
    errorMessage?: string;
    label: string;
    required?: boolean;
    autoFocus?: boolean;
    onChange?: OutlinedInputProps['onChange'];
    gridSize?: GridSize;
    readOnly?: boolean;
}

function UnwrappedTextArea({id, value, errorMessage, minRows, maxRows, onChange, label, required, autoFocus, readOnly}: Readonly<FormTextAreaProps>) {

    return (
        <FormControl fullWidth>
            {/* TODO label and error message */}
            {label}
            <TextareaAutosize
                id={id}
                name={id}
                value={value}
                minRows={minRows}
                maxRows={maxRows}
                autoFocus={autoFocus}
                required={required}
                readOnly={readOnly}
                color={errorMessage == undefined ? 'primary' : 'error'}
                onChange={onChange}
            />
            <TextField
                label={label}
                fullWidth
                variant="outlined"
                error={errorMessage != undefined}
                helperText={errorMessage}
                sx={{ ariaLabel: {label}}}
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
 * @constructor
 */
export default function FormTextArea({id, value, errorMessage, minRows, maxRows, onChange, label, required, autoFocus, gridSize, readOnly}: Readonly<FormTextAreaProps>) {

    return (
        <>
            { gridSize && (
                <Grid size={gridSize}>
                    <UnwrappedTextArea
                        id={id}
                        value={value}
                        label={label}
                        minRows={minRows}
                        maxRows={maxRows}
                        readOnly={readOnly}
                        autoFocus={autoFocus}
                        required={required}
                        errorMessage={errorMessage}
                        onChange={onChange}
                    />
                </Grid>
            )}
            { !gridSize && (
                <UnwrappedTextArea
                    id={id}
                    value={value}
                    label={label}
                    minRows={minRows}
                    maxRows={maxRows}
                    readOnly={readOnly}
                    autoFocus={autoFocus}
                    required={required}
                    errorMessage={errorMessage}
                    onChange={onChange}
                />
            )}
        </>
    );
}
