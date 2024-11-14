import {MouseEventHandler} from "react";
import {Button} from "@mui/material";
import {Add} from "@mui/icons-material";
import Grid from "@mui/material/Grid2";

interface FormButtonSaveProps {
    label: string;
    onClick: MouseEventHandler | undefined;
}

export default function FormButton({ label, onClick}: Readonly<FormButtonSaveProps>) {

    return (
        <Grid size={12}>
            <Button variant="contained"
                    onClick={onClick}
                    size="small"
                    startIcon={<Add />}>
                {label}
            </Button>
        </Grid>
    );

}
