import {FormControl, InputLabel, MenuItem} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Select from "@mui/material/Select";
import {SelectInputProps} from "@mui/material/Select/SelectInput";
import {GridSize} from "@mui/material/Grid2/Grid2";

export declare interface KeyLabelItem {
    key: string;
    label: string;
}

interface FormSelectProps {
    id: string;
    value: string;
    label: string;
    items: KeyLabelItem[];
    onChange: SelectInputProps['onChange'];
    gridSize?: GridSize;
}

export function FormSelect({ id, value, onChange, label, items, gridSize}: Readonly<FormSelectProps>) {

    return (
        <>
            { gridSize && (
                <Grid size={gridSize}>
                    <FormControl fullWidth>
                        <InputLabel id={id}>{label}</InputLabel>
                        <Select
                            labelId={id}
                            id={id}
                            value={value}
                            label={label}
                            variant="outlined"
                            onChange={onChange}
                            fullWidth
                        >
                            {items.map((item) => (<MenuItem key={item.key} value={item.key}>{item.label}</MenuItem>))}
                        </Select>
                    </FormControl>
                </Grid>
            )}
            { !gridSize && (
                <FormControl>
                    <InputLabel id={id}>{label}</InputLabel>
                    <Select
                        labelId={id}
                        id={id}
                        value={value}
                        label={label}
                        variant="outlined"
                        onChange={onChange}
                        fullWidth
                    >
                        {items.map((item) => (<MenuItem key={item.key} value={item.key}>{item.label}</MenuItem>))}
                    </Select>
                </FormControl>
            )}
        </>
    );
}

