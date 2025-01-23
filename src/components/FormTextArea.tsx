"use client"

import Grid from "@mui/material/Grid2";
import {FormControl, TextField} from "@mui/material";
import {GridSize} from "@mui/material/Grid2/Grid2";

interface ComponentProps {
    id: string;
    minRows?: number | string;
    maxRows?: number | string;
    value: string | undefined;
    errorMessage?: string;
    label: string;
    required?: boolean;
    autoFocus?: boolean;
    onChange?: (text: string) => void;
    gridSize?: GridSize;
    readOnly?: boolean;
}

const UnwrappedTextArea = ({id, value, errorMessage, minRows, maxRows, onChange, label, required, autoFocus, readOnly}: Readonly<ComponentProps>) => {

    return (
        <FormControl fullWidth>
            <TextField
                id={id}
                name={id}
                type={"text"}
                value={value}
                label={label}
                onChange={e => onChange && onChange(e.target.value)}
                fullWidth
                required={required}
                autoFocus={autoFocus}
                variant="outlined"
                error={errorMessage != undefined}
                helperText={errorMessage}
                multiline
                rows={minRows}
                maxRows={maxRows}
                color={errorMessage == undefined ? 'primary' : 'error'}
                sx={{ ariaLabel: {label}}}
                slotProps={{
                    input: {
                        readOnly: readOnly
                    }
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
 * @constructor
 */
export const FormTextArea = ({id, value, errorMessage, minRows, maxRows, onChange, label, required, autoFocus, gridSize, readOnly}: Readonly<ComponentProps>) => {

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
