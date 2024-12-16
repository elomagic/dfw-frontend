import * as React from "react";

interface FieldsetProps {
    label?: string;
    children: React.ReactNode;
}

/**
 * Gives for component, string what ever, a smart border with a border label.
 *
 * @param label Label of the border
 * @param children Components children's
 * @param props Any other props
 */

export const Fieldset = ({ label, children, ...props }: FieldsetProps) => {
    return (
        <fieldset {...props}
             style={{
                 borderColor: "rgba(255, 255, 255, 0.3)",
                 borderRadius: 1,
                 borderWidth: 1,
                 margin: "-9px 0 0 0",
                 /*
                 '&:hover': {
                     borderColor: "white",
                 },
                 "&:focus-within": {
                     borderColor: "#90caf9",
                     borderWidth: 2,
                 }
                 */
             }}
        >
            {label && (<legend
                style={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: '0.75rem',
                }}>
                {label}
            </legend>)}
            {children}
        </fieldset>
    );
};