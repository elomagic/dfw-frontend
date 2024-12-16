import {GridItem, GridSize} from "../components/Grids.tsx";
import {FormItem} from "../components/FormItem.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../components/ui/select.tsx";

export declare interface KeyLabelItem {
    key: string;
    label: string;
}

interface FormSelectProps {
    id: string;
    value: string;
    label: string;
    items: KeyLabelItem[];
    onChange: (value: string) => void;
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
        <FormItem label={label} htmlFor={id}>
            <Select onValueChange={onChange} value={value}>
                <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder={label} />
                </SelectTrigger>
                <SelectContent id={id}>
                    {items.map((item) => (<SelectItem key={item.key} value={item.key}>{item.label}</SelectItem>))}
                </SelectContent>
            </Select>
        </FormItem>
    );
}

export function FormSelect({ id, value, onChange, label, items, gridSize}: Readonly<FormSelectProps>) {

    return (
        <>
            { gridSize && (
                <GridItem size={gridSize}>
                    <UnwrappedFormSelect id={id} value={value} label={label} items={items} onChange={onChange} />
                </GridItem>
            )}
            { !gridSize && (
                <UnwrappedFormSelect id={id} value={value} label={label} items={items} onChange={onChange} />
            )}
        </>
    );
}

