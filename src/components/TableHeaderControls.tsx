import {Box, Button, IconButton, TextField} from "@mui/material";
import {Add, Refresh} from "@mui/icons-material";
import {useAuth} from "../auth/useAuth.ts";
import {Role} from "../auth/Auth.tsx";

interface TableHeaderControlsProps {
    createCaption?: string;
    onCreateClicked?: () => void;
    onFilterChanged: (filter: string) => void;
    onRefresh: () => void;
    role?: Role;
}

export default function TableHeaderControls({ createCaption, role, onCreateClicked, onFilterChanged, onRefresh }: Readonly<TableHeaderControlsProps>) {

    const auth = useAuth();

    return (
        <Box display="flex" flexDirection="row" marginBottom={2}>
            {(role === undefined || auth.roles.includes(role)) && onCreateClicked &&
                <Button variant="outlined"
                        onClick={onCreateClicked}
                        size="small"
                        startIcon={<Add />}>
                    {createCaption}
                </Button>
            }
            <Box flexGrow={1} />
            {onFilterChanged &&
                <TextField size="small" onChange={e => {onFilterChanged(e.target.value)}} />
            }
            <IconButton aria-label="refresh" onClick={onRefresh}><Refresh /></IconButton>
        </Box>
    );
}
