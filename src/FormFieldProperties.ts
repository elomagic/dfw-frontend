
export declare interface FormFieldProperty {
    name: string;
    minLength?: number;
    maxLength?: number;
}

export const validateInputs = (fields: FormFieldProperty[], onResult: (fieldName: string, result: string | undefined) => void): boolean => {
    let result = false;

    //const validateInputs = ((onResult: (string | undefined) => void) => ()) {
    for (const field of fields) {
        const value = document.getElementById(field.name) as HTMLInputElement;

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