import {MouseEventHandler} from "react";
import {Button} from "@mui/material";
import {Save} from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import * as React from "react";

interface FormButtonSaveProps {
    label: string;
    onClick: MouseEventHandler | undefined;
    startIcon?: React.ReactNode;
}

export default function FormButton({ label, onClick, startIcon}: Readonly<FormButtonSaveProps>) {

    return (
        <Grid size={12}>
            <Button variant="contained"
                    onClick={onClick}
                    size="small"
                    startIcon={startIcon ?? <Save />}>
                {label}
            </Button>
        </Grid>
    );

}
