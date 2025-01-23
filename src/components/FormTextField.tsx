"use client"

import {HTMLInputTypeAttribute, ReactNode, useEffect, useState} from "react";
import Grid from "@mui/material/Grid2";
import {FormControl, TextField} from "@mui/material";
import {GridSize} from "@mui/material/Grid2/Grid2";
import {validateRequiredText} from "../Validators.ts";

interface ComponentProps {
    id: string;
    type?: HTMLInputTypeAttribute;
    value: string | undefined;
    errorMessage?: string;
    label: string;
    required?: boolean;
    autoFocus?: boolean;
    onChange?: (newValue: string) => void;
    gridSize?: GridSize;
    readOnly?: boolean;
    startAdornment?: ReactNode;
}

const UnwrappedTextField = ({id, type, value, errorMessage, onChange, label, required, autoFocus, readOnly, startAdornment}: Readonly<ComponentProps>) => {

    const [em, setEm] = useState<string|undefined>(errorMessage)

    useEffect(() => {
        setEm(errorMessage);
    }, [errorMessage]);

    return (
        <FormControl fullWidth>
            <TextField
                id={id}
                name={id}
                type={type ?? "text"}
                value={value}
                label={label}
                onChange={e => {
                    if (required) {
                        validateRequiredText(e.target.value, setEm);
                    }
                    if (onChange) {
                        onChange(e.target.value);
                    }
                }}
                fullWidth
                required={required}
                autoFocus={autoFocus}
                variant="outlined"
                size="small"
                error={em != undefined}
                helperText={em}
                color={em == undefined ? 'primary' : 'error'}
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
export const FormTextField = ({id, type, value, errorMessage, onChange, label, required, autoFocus, gridSize, readOnly, startAdornment}: Readonly<ComponentProps>) => {
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
