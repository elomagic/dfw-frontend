import {Dispatch, SetStateAction} from "react";

export const validateRequiredText = (value: string|undefined, setErrorMessage: Dispatch<SetStateAction<string | undefined>>) => {
    const result = value && value.length > 0;
    setErrorMessage(result ? undefined : "This field is required");
    return result;
}

export const validateRequiredUrl = (value: string|undefined, setErrorMessage: Dispatch<SetStateAction<string | undefined>>) => {
    if (!value || value.length === 0) {
        setErrorMessage("This field is required");
        return false;
    }

    try {
        const url = new URL(value ?? "");
        const result = url.protocol === "http:" || url.protocol === "https:";
        setErrorMessage(result ? undefined : "This URL is invalid");
        return result;
    } catch (e) {
        setErrorMessage("This URL is invalid: " + e);
        return false;
    }
}