import {GridItem, GridSize} from "../components/Grids.tsx";
import {FormItem} from "../components/FormItem.tsx";
import {Textarea} from "../components/ui/textarea.tsx";
import {ChangeEventHandler} from "react";

interface FormTextAreaProps {
    id: string;
    minRows?: number;
    value: string | undefined;
    errorMessage?: string;
    label: string;
    required?: boolean;
    autoFocus?: boolean;
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
    gridSize?: GridSize;
    readOnly?: boolean;
}

function UnwrappedTextArea({id, value, errorMessage, minRows, onChange, label, required, autoFocus, readOnly}: Readonly<FormTextAreaProps>) {

    return (
        <FormItem htmlFor={id} label={label} errorMessage={errorMessage}>
            <Textarea
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                style={{ height: "100%" }}
                required={required}
                autoFocus={autoFocus}
                rows={minRows}
                color={errorMessage == undefined ? 'primary' : 'error'}
                aria-label={label}
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
 * @constructor
 */
export default function FormTextArea({id, value, errorMessage, minRows, onChange, label, required, autoFocus, gridSize, readOnly}: Readonly<FormTextAreaProps>) {

    return (
        <>
            { gridSize && (
                <GridItem size={gridSize}>
                    <UnwrappedTextArea
                        id={id}
                        value={value}
                        label={label}
                        minRows={minRows}
                        readOnly={readOnly}
                        autoFocus={autoFocus}
                        required={required}
                        errorMessage={errorMessage}
                        onChange={onChange}
                    />
                </GridItem>
            )}
            { !gridSize && (
                <UnwrappedTextArea
                    id={id}
                    value={value}
                    label={label}
                    minRows={minRows}
                    readOnly={readOnly}
                    autoFocus={autoFocus}
                    required={required}
                    errorMessage={errorMessage}
                    onChange={onChange}
                />
            )}
        </>
    );
}
