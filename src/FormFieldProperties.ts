import {FormFieldValidationProperty} from "./components/FormBuilder.ts";

export const validateInputs = (fields: FormFieldValidationProperty[], onResult: (fieldName: string, result: string | undefined) => void): boolean => {
    let result = false;

    //const validateInputs = ((onResult: (string | undefined) => void) => ()) {
    for (const field of fields) {
        const value = document.getElementById(field.name) as HTMLInputElement;

        if (!value.value) {
            continue;
        }

        if (field.minLength != undefined && value.value.length < field.minLength) {
            onResult(field.name, field.name + " must at least {field.minLength} long");
            result = true;
            continue;
        }

        if (field.maxLength != undefined && value.value.length <= field.maxLength) {
            onResult(field.name, field.name + ' must not longer then {field.maxLength} chars long');
            result = true;
            continue;
        }

        onResult(field.name, undefined);
    }

    return result;
};