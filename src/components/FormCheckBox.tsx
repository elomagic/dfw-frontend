import {GridItem, GridSize} from "../components/Grids.tsx";
import {Switch} from "../components/ui/switch.tsx";
import {Label} from "../components/ui/label.tsx";

interface FormCheckboxProps {
    id: string;
    value: boolean;
    label: string;
    onChange: (check:boolean) => void;
    gridSize?: GridSize;
}

function UnwrappedFormCheckBox({ id, value, onChange, label}: Readonly<FormCheckboxProps>) {
    return (
        <>
            <Switch id={id} checked={value} onCheckedChange={onChange}/>
            <Label htmlFor={id}>{label}</Label>
        </>
    );
}

export function FormCheckbox({id, value, onChange, label, gridSize}: Readonly<FormCheckboxProps>) {

    return (
        <>
            {gridSize && (
                <GridItem size={gridSize}>
                    <UnwrappedFormCheckBox id={id} value={value} label={label} onChange={onChange} />
                </GridItem>
            )}
            {!gridSize && (
                <UnwrappedFormCheckBox id={id} value={value} label={label} onChange={onChange} />
            )}
        </>
    );
}