import {FormControl, InputLabel, MenuItem} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Select from "@mui/material/Select";
import {SelectInputProps} from "@mui/material/Select/SelectInput";
import {GridSize} from "@mui/material/Grid2/Grid2";


// For internal managing, create my own item ID
// TODO Must be moved in a separate file
export declare type ItemId<T> = T & {
    _itemId: string;
};

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

/**
 * Select aka ComboBox
 * @param id
 * @param value
 * @param onChange
 * @param label
 * @param items
 * @constructor
 */
function UnwrappedFormSelect({ id, value, onChange, label, items}: Readonly<FormSelectProps>) {

    return (
        <>
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
        </>
    );
}

export function FormSelect({ id, value, onChange, label, items, gridSize}: Readonly<FormSelectProps>) {

    return (
        <>
            { gridSize && (
                <Grid size={gridSize}>
                    <UnwrappedFormSelect id={id} value={value} label={label} items={items} onChange={onChange} />
                </Grid>
            )}
            { !gridSize && (
                <UnwrappedFormSelect id={id} value={value} label={label} items={items} onChange={onChange} />
            )}
        </>
    );
}

