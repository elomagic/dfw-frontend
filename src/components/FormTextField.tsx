import {ChangeEventHandler, HTMLInputTypeAttribute, ReactNode} from "react";
import {GridItem, GridSize} from "../components/Grids.tsx";
import {Input} from "../components/ui/input.tsx";
import {FormItem} from "../components/FormItem.tsx";

interface FormTextFieldProps {
    id: string;
    type?: HTMLInputTypeAttribute;
    value: string | undefined;
    errorMessage?: string;
    label: string;
    required?: boolean;
    autoFocus?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    gridSize?: GridSize;
    readOnly?: boolean;
    startAdornment?: ReactNode;
}

function UnwrappedTextField({id, type, value, errorMessage, onChange, label, required, autoFocus, readOnly}: Readonly<FormTextFieldProps>) {

    return (
        <FormItem htmlFor={id} errorMessage={errorMessage} label={label}>
            <Input
                id={id}
                name={id}
                type={type ?? "text"}
                value={value}
                onChange={onChange}
                required={required}
                autoFocus={autoFocus}
                color={errorMessage == undefined ? 'primary' : 'error'}
                aria-label={label}
                style={{ width: "100%" }}
                readOnly={readOnly}
            />
        </FormItem>
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
export default function FormTextField({id, type, value, errorMessage, onChange, label, required, autoFocus, gridSize, readOnly, startAdornment}: Readonly<FormTextFieldProps>) {

    return (
        <>
            { gridSize && (
                <GridItem size={gridSize}>
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
                </GridItem>
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
