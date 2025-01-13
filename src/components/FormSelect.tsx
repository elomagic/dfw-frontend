import {FormControl, MenuItem} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Select from "@mui/material/Select";
import {SelectInputProps} from "@mui/material/Select/SelectInput";
import {GridSize} from "@mui/material/Grid2/Grid2";
import {Fieldset} from "./Fieldset.tsx";

export declare interface KeyLabelItem {
    key: string;
    label: string;
}

export const mapToKeyLabelItemArray = (items: string[]): KeyLabelItem[] => {
    return items.map(s => { return { key: s, label: s }});
}

interface ComponentProps {
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
function UnwrappedFormSelect({ id, value, onChange, label, items}: Readonly<ComponentProps>) {

    return (
        <Fieldset label={label}>
            <FormControl fullWidth={true}>
                <Select
                    labelId={id}
                    id={id}
                    value={value}
                    variant="standard"
                    size="small"
                    onChange={onChange}
                    fullWidth
                    sx={{
                        '&::before': {
                            border: 'none'
                        },
                        '&::after': {
                            border: 'none'
                        },
                    }}
                >
                    {items.map((item) => (<MenuItem key={item.key} value={item.key}>{item.label}</MenuItem>))}
                </Select>
            </FormControl>
        </Fieldset>
    );
}

export function FormSelect({ id, value, onChange, label, items, gridSize}: Readonly<ComponentProps>) {

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

