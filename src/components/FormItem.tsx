import * as React from "react";
import {Label} from "../components/ui/label.tsx";

interface FormItemProps {
    label?: string;
    errorMessage?: string;
    htmlFor?: string;
    children: React.ReactNode;
}

export function FormItem({ label, errorMessage, htmlFor, children }: Readonly<FormItemProps>) {

    return (
        <div>
            <Label htmlFor={htmlFor}>{label}</Label>
            {children}
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    );

}