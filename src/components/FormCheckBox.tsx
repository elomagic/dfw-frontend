import {SwitchBaseProps} from "@mui/material/internal/SwitchBase";
import Grid from "@mui/material/Grid2";
import {Checkbox, FormControl, FormControlLabel} from "@mui/material";

interface FormCheckboxProps {
    id: string;
    value: boolean;
    label: string;
    onChange: SwitchBaseProps['onChange'];
    gridSize?: number;
}

export function FormCheckbox({ id, value, onChange, label, gridSize}: Readonly<FormCheckboxProps>) {

    return (
        <>
            {gridSize && (
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
            {!gridSize && (
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