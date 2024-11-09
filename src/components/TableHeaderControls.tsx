import {Box, Button, IconButton, TextField} from "@mui/material";
import {Add, Refresh} from "@mui/icons-material";

interface TableHeaderControlsProps {
    createCaption: string;
    onCreateClicked: () => void;
    onFilterChanged: (filter: string) => void;
    onRefresh: () => void;
}

export default function TableHeaderControls({ createCaption, onCreateClicked, onFilterChanged, onRefresh }: Readonly<TableHeaderControlsProps>) {

    return (
        <Box display="flex" flexDirection="row" marginBottom={2}>
            <Button variant="outlined"
                    onClick={onCreateClicked}
                    size="small"
                    startIcon={<Add />}>
                {createCaption}
            </Button>
            <Box flexGrow={1} />
            <TextField size="small" onChange={e => {onFilterChanged(e.target.value)}} />
            <IconButton aria-label="refresh" onClick={onRefresh}><Refresh /></IconButton>
        </Box>
    );
}
