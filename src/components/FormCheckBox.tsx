"use client"

import {SwitchBaseProps} from "@mui/material/internal/SwitchBase";
import Grid from "@mui/material/Grid2";
import {FormControl, FormControlLabel, Switch} from "@mui/material";
import {GridSize} from "@mui/material/Grid2/Grid2";

interface ComponentProps {
    id: string;
    value: boolean;
    label: string;
    onChange: SwitchBaseProps['onChange'];
    gridSize?: GridSize;
}

function UnwrappedFormCheckBox({ id, value, onChange, label}: Readonly<ComponentProps>) {
    return (
        <FormControl>
            <FormControlLabel
                control={<Switch onChange={onChange}/>}
                id={id}
                name={id}
                checked={value}
                label={label}
            />
        </FormControl>
    );
}

export function FormCheckbox({ id, value, onChange, label, gridSize}: Readonly<ComponentProps>) {

    return (
        <>
            {gridSize && (
                <Grid size={gridSize}>
                    <UnwrappedFormCheckBox id={id} value={value} label={label} onChange={onChange} />
                </Grid>
            )}
            {!gridSize && (
                <UnwrappedFormCheckBox id={id} value={value} label={label} onChange={onChange} />
            )}
        </>
    );
}