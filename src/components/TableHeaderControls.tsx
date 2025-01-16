"use client"

import {Box, Button, IconButton, TextField, Tooltip} from "@mui/material";
import {Add, Refresh} from "@mui/icons-material";
import {useAuth} from "../auth/useAuth.ts";
import {Role} from "../auth/Auth.tsx";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";

interface ComponentProps {
    createCaption?: string;
    filter?: string;
    role?: Role;
    onCreateClicked?: () => void;
    onFilterChanged?: (filter: string) => void;
    onRefresh: () => void;
}

export default function TableHeaderControls({ createCaption, filter, role, onCreateClicked, onFilterChanged, onRefresh }: Readonly<ComponentProps>) {

    const { t } = useTranslation();
    const auth = useAuth();

    const [fil, setFil] = useState<string|undefined>("");

    useEffect(() => {
        setFil(filter)
    }, [filter]);

    const handleFilterChanged = (f: string) => {
        setFil(f);

        if (onFilterChanged) {
            onFilterChanged(f);
        }
    }

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
                <TextField size="small"
                           value={fil}
                           placeholder={t("filter")}
                           onChange={e => {handleFilterChanged(e.target.value)}}
                />
            }

            <Tooltip title={t("reset-view")}>
                <IconButton aria-label="refresh" onClick={onRefresh}><Refresh /></IconButton>
            </Tooltip>
        </Box>
    );
}
