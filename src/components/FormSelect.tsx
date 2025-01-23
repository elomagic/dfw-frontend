"use client"

import {FormControl, MenuItem} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Select from "@mui/material/Select";
import {GridSize} from "@mui/material/Grid2/Grid2";
import {Fieldset} from "./Fieldset.tsx";
import "./FormSelect.css";

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
    onChange: (key: string) => void;
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
const UnwrappedFormSelect = ({ id, value, onChange, label, items}: Readonly<ComponentProps>) => {

    return (
        <Fieldset label={label}>
            <FormControl fullWidth={true}>
                <Select
                    labelId={id}
                    id={id}
                    value={value}
                    variant="standard"
                    size="small"
                    onChange={e => onChange(e.target.value as string)}
                    fullWidth
                    className={"FormSelect"}
                    sx={{
                        backgroundColor: "unset",
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

export const FormSelect = ({ id, value, onChange, label, items, gridSize}: Readonly<ComponentProps>) => {

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

