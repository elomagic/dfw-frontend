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
import {useEffect, useState} from "react";
import SelectItemDialog from "./SelectItemDialog.tsx";
import {GridSize} from "@mui/material/Grid2/Grid2";
import {v4 as uuidv4} from "uuid";
import {ItemId} from "../DTOs.ts";

interface FormSelectListProps<T> {
    value: T[];
    selectables: T[];
    label: string;
    labelItemExtractor: (item: T) => string;
    onChange: (selected: T[]) => void;
    gridSize?: GridSize;
}

export default function FormSelectList<T> ({ label, selectables, gridSize, onChange, value, labelItemExtractor}: Readonly<FormSelectListProps<T>>) {

    const { t } = useTranslation();
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
        // TODO Sync _itemId with selectables
        setValues(value.map(item => ({ ...item, _itemId: uuidv4() })));
    }, [value]);

    return (
        <>
            { gridSize && (
                <Grid size={gridSize}>
                    {label}
                    <List sx={{
                        width: '100%', height: 300, margin: '6px 0 6px 0',
                        border: '1px solid rgba(81, 81, 81, 1)', borderRadius: '4px', padding: '8px 14px',
                        overflow: "auto"
                    }}>
                        {values
                            .map((item) => (
                                <ListItem key={item._itemId}
                                          disablePadding
                                          secondaryAction={
                                                <IconButton edge="end" aria-label="remove">
                                                    <RemoveCircle color="error" onClick={() => handleDeleteClick(item._itemId)}/>
                                                </IconButton>}
                                >
                                <ListItemText id={item._itemId} primary={labelItemExtractor(item)} />
                            </ListItem>)
                        )}
                    </List>
                    <Button variant="outlined"
                            onClick={handleAddClick}
                            size="small"
                            startIcon={<Add />}>
                        {t("add")}
                    </Button>
                </Grid>
            )}
            <SelectItemDialog<ItemId<T>>
                open={dialogOpen}
                handleClose={handleCloseDialog}
                value={values}
                selectables={selectables.map(item => ({ ...item, _itemId: uuidv4() }))}
                labelItemExtractor={(item => labelItemExtractor(item))}
            />
        </>
    );
}
