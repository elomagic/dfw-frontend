import * as React from "react";

interface FieldsetProps {
    label?: string;
    children: React.ReactNode;
}

export const Fieldset = ({ label, children, ...props }: FieldsetProps) => {
    return (
        <fieldset {...props}>
            {label && <legend>{label}</legend>}
            {children}
        </fieldset>
    );
};