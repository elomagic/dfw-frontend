"use client"

import {Box, Button, IconButton, TextField, Tooltip} from "@mui/material";
import {Add, Refresh} from "@mui/icons-material";
import {useAuth} from "../auth/useAuth.ts";
import {Role} from "../auth/Role.ts";
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

export const TableHeaderControls = (props: Readonly<ComponentProps>) => {

    const { t } = useTranslation();
    const auth = useAuth();

    const [filter, setFilter] = useState<string|undefined>("");

    useEffect(() => setFilter(props.filter), [props.filter]);

    const handleFilterChanged = (f: string) => {
        setFilter(f);

        if (props.onFilterChanged) {
            props.onFilterChanged(f);
        }
    }

    return (
        <Box display="flex" flexDirection="row" marginBottom={2}>
            {(props.role === undefined || auth.roles.includes(props.role)) && props.onCreateClicked &&
                <Button variant="outlined"
                        onClick={props.onCreateClicked}
                        size="small"
                        startIcon={<Add />}>
                    {props.createCaption}
                </Button>
            }

            <Box flexGrow={1} />

            {props.onFilterChanged &&
                <TextField size="small"
                           value={filter}
                           placeholder={t("filter")}
                           onChange={e => handleFilterChanged(e.target.value)}
                />
            }

            <Tooltip title={t("reset-view")}>
                <IconButton aria-label="refresh" onClick={props.onRefresh}><Refresh /></IconButton>
            </Tooltip>
        </Box>
    );
}
