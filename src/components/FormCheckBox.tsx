"use client"

import Grid from "@mui/material/Grid2";
import {FormControl, FormControlLabel, Switch} from "@mui/material";
import {GridSize} from "@mui/material/Grid2/Grid2";

interface ComponentProps {
    id: string;
    value: boolean;
    label: string;
    onChange: (select: boolean) => void;
    gridSize?: GridSize;
}

const UnwrappedFormCheckBox = ({ id, value, onChange, label}: Readonly<ComponentProps>) => {
    return (
        <FormControl>
            <FormControlLabel
                control={<Switch onChange={e => onChange(e.target.checked)}/>}
                id={id}
                name={id}
                checked={value}
                label={label}
            />
        </FormControl>
    );
}

export const FormCheckbox = ({ id, value, onChange, label, gridSize}: Readonly<ComponentProps>) => {

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