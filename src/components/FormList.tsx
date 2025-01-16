"use client"

import {
    Button,
    IconButton,
    List,
    ListItem,
    ListItemText
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {Add, RemoveCircle} from "@mui/icons-material";
import {useTranslation} from "react-i18next";
import {ReactNode, useEffect, useState} from "react";
import {GridSize} from "@mui/material/Grid2/Grid2";
import { v4 as uuidv4 } from 'uuid';
import {ItemId} from "../DTOs.ts";
import {Fieldset} from "./Fieldset.tsx";
import {useAuth} from "../auth/useAuth.ts";

interface ComponentProps<T> {
    values: ItemId<T>[];
    label: string;
    editRole?: string;
    gridSize?: GridSize;
    getItemLabel: (item: T) => ReactNode;
    onAddClick?: () => void;
    onDeleteClick: (itemId: string) => void;
}

function UnwrappedFormList<T>({ values, label, getItemLabel, editRole, onAddClick, onDeleteClick }: Readonly<ComponentProps<T>>) {

    const auth = useAuth();
    const { t } = useTranslation();

    return (
        <>
        <Fieldset label={label}>
            <List sx={{
                width: '100%', minHeight: '32px', maxHeight: '100px', overflow: "auto", padding: 0
            }}>
                {values
                    .map((item) => (
                        <ListItem key={item._itemId}
                                  disablePadding
                                  secondaryAction={
                                      (editRole === undefined || auth.roles.includes(editRole)) &&
                                      <IconButton edge="end" aria-label="remove" sx={{ padding: 0 }}>
                                          <RemoveCircle color="error" onClick={() => onDeleteClick(item._itemId)}/>
                                      </IconButton>}
                        >
                            <ListItemText id={item._itemId} primary={getItemLabel(item)} />
                        </ListItem>)
                    )}
            </List>
        </Fieldset>
            { (editRole === undefined || auth.roles.includes(editRole)) && onAddClick &&
                <Button variant="outlined"
                        onClick={onAddClick}
                        size="small"
                        startIcon={<Add />}
                        sx={{ mt: "8px", mb: "8px" }}>
                    {t("add")}
                </Button>
            }
        </>
    );
}

interface FormListProps<T> {
    value: T[];
    label: string;
    getItemLabel: (item: T) => string;
    onChange: (selected: T[]) => void;
    onAddClick?: () => void;
    gridSize?: GridSize;
}

export default function FormList<T>({ value, label, getItemLabel, gridSize, onChange, onAddClick }: Readonly<FormListProps<T>>) {

    const [ values, setValues ] = useState<ItemId<T>[]>([]);

    const handleDeleteClick = (key: string) => {
        const v = values.filter(item => item._itemId !== key);
        onChange(v);
    }

    useEffect(() => {
        setValues(value.map(item => ({ ...item, _itemId: uuidv4() })));
    }, [value]);

    return (
        <>
            { gridSize && (
                <Grid size={gridSize}>
                    <UnwrappedFormList values={values} label={label} getItemLabel={getItemLabel} onDeleteClick={(itemId) => handleDeleteClick(itemId)} onAddClick={onAddClick} />
                </Grid>
            )}
            { !gridSize && (
                <UnwrappedFormList values={values} label={label} getItemLabel={getItemLabel} onDeleteClick={(itemId) => handleDeleteClick(itemId)} onAddClick={onAddClick} />
            )}
        </>
    );
}
