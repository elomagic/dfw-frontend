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
import SelectItemDialog from "./SelectItemDialog.tsx";
import {GridSize} from "@mui/material/Grid2/Grid2";
import {ItemId} from "../DTOs.ts";
import {Fieldset} from "./Fieldset.tsx";

interface UnwrappedFormSelectListProps<T> {
    values: ItemId<T>[];
    label: string;
    getItemLabel: (item: T) => ReactNode;
    onAddClick: () => void;
    onDeleteClick: (itemId: ItemId<T>) => void;
}

function UnwrappedFormSelectList<T>({ values, getItemLabel, label, onAddClick, onDeleteClick }: Readonly<UnwrappedFormSelectListProps<T>>) {

    const { t } = useTranslation();

    return (
        <>
            <Fieldset label={label}>
                <List sx={{
                    width: '100%', minHeight: '32px', height: 300, overflow: "auto", padding: 0
                }}>
                    {values
                        .map((item) => (
                            <ListItem key={item._itemId}
                                      disablePadding
                                      secondaryAction={
                                          <IconButton edge="end" aria-label="remove">
                                              <RemoveCircle color="error" onClick={() => onDeleteClick(item)}/>
                                          </IconButton>}
                            >
                                <ListItemText id={item._itemId} primary={getItemLabel(item)} />
                            </ListItem>)
                        )}
                </List>

            </Fieldset>
            <Button variant="outlined"
                    onClick={onAddClick}
                    size="small"
                    startIcon={<Add />}
                    sx={{ mt: "8px", mb: "8px" }}
            >
                {t("add")}
            </Button>
        </>
    );
}

interface FormSelectListProps<T> {
    value: T[];
    selectables: T[];
    label: string;
    getItemId: (item: T) => string;
    getItemLabel: (item: T) => ReactNode;
    onChange: (selected: T[]) => void;
    gridSize?: GridSize;
}

export default function FormSelectList<T> ({ value, selectables, onChange, getItemId, getItemLabel, label, gridSize }: Readonly<FormSelectListProps<T>>) {

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
                                             onAddClick={handleAddClick}
                                             onDeleteClick={(item) => handleDeleteClick(item._itemId)} />
                </Grid>
            )}
            { !gridSize && (
                <UnwrappedFormSelectList values={values}
                                         getItemLabel={getItemLabel}
                                         label={label}
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
