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
import {ItemId} from "../DTOs.ts";
import {Fieldset} from "./Fieldset.tsx";
import {useAuth} from "../auth/useAuth.ts";
import {SelectItemDialog} from "./SelectItemDialog.tsx";

interface ComponentProps<T> {
    values: ItemId<T>[];
    label: string;
    editRole?: string;
    getItemLabel: (item: T) => ReactNode;
    onAddClick: () => void;
    onDeleteClick: (itemId: ItemId<T>) => void;
}

const UnwrappedFormSelectList = <T,>({ values, getItemLabel, label, editRole, onAddClick, onDeleteClick }: Readonly<ComponentProps<T>>) => {

    const auth = useAuth();
    const { t } = useTranslation();

    return (
        <>
            <Fieldset label={label}>
                <List sx={{width: '100%', minHeight: '32px', height: 300, overflow: "auto", padding: 0}}>
                    {values
                        .map((item) => (
                            <ListItem key={item._itemId}
                                      disablePadding
                                      secondaryAction={
                                          (editRole === undefined || auth.roles.includes(editRole)) &&
                                              <IconButton edge="end" aria-label="remove" sx={{padding: 0}}>
                                                  <RemoveCircle color="error" onClick={() => onDeleteClick(item)}/>
                                              </IconButton>
                                            }
                            >
                                <ListItemText id={item._itemId} primary={getItemLabel(item)} />
                            </ListItem>)
                        )}
                </List>

            </Fieldset>
            { (editRole === undefined || auth.roles.includes(editRole)) &&
                <Button variant="outlined"
                        onClick={onAddClick}
                        size="small"
                        startIcon={<Add />}
                        sx={{ mt: "8px", mb: "8px" }}
                >
                    {t("add")}
                </Button>
            }
        </>
    );
}

interface FormSelectListProps<T> {
    value: T[];
    selectables: T[];
    label: string;
    editRole?: string;
    gridSize?: GridSize;
    getItemId: (item: T) => string;
    getItemLabel: (item: T) => ReactNode;
    onChange: (selected: T[]) => void;

}

export const FormSelectList = <T,> ({ value, selectables, label, editRole, gridSize, onChange, getItemId, getItemLabel }: Readonly<FormSelectListProps<T>>) => {

    const [ dialogOpen, setDialogOpen ] = useState<boolean>(false);
    const [ values, setValues ] = useState<ItemId<T>[]>([]);

    const handleCloseDialog = (cancel: boolean, items: ItemId<T>[]) => {
        setDialogOpen(false);
        if (!cancel) {
            setValues(items)
            onChange(items);
        }
    }

    const handleAddClick = () => {
        setDialogOpen(true);
    }

    const handleDeleteClick = (key: string) => {
        const v = values.filter(item => item._itemId !== key);
        onChange(v);
    }

    useEffect(() => {
        setValues(value.map(item => ({ ...item, _itemId: getItemId(item) })));
    }, [getItemId, value]);

    return (
        <>
            { gridSize && (
                <Grid size={gridSize}>
                    <UnwrappedFormSelectList values={values}
                                             getItemLabel={getItemLabel}
                                             label={label}
                                             editRole={editRole}
                                             onAddClick={handleAddClick}
                                             onDeleteClick={(item) => handleDeleteClick(item._itemId)} />
                </Grid>
            )}
            { !gridSize && (
                <UnwrappedFormSelectList values={values}
                                         getItemLabel={getItemLabel}
                                         label={label}
                                         editRole={editRole}
                                         onAddClick={handleAddClick}
                                         onDeleteClick={(item) => handleDeleteClick(item._itemId)} />
            )}
            <SelectItemDialog<ItemId<T>>
                open={dialogOpen}
                handleClose={handleCloseDialog}
                value={values}
                selectables={selectables.map(item => ({ ...item, _itemId: getItemId(item) }))}
                getItemLabel={(item => getItemLabel(item))}
            />
        </>
    );
}
