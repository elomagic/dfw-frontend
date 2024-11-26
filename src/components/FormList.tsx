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

interface UnwrappedFormListProps<T> {
    values: ItemId<T>[];
    label: string;
    getItemLabel: (item: T) => ReactNode;
    onAddClick?: () => void;
    onDeleteClick: (itemId: string) => void;
    gridSize?: GridSize;
}


function UnwrappedFormList<T>({ values, label, getItemLabel, onAddClick, onDeleteClick }: Readonly<UnwrappedFormListProps<T>>) {

    const { t } = useTranslation();

    return (
        <>
            {label}
            <List sx={{
                width: '100%', minHeight: '56px', maxHeight: '200px', margin: '6px 0 6px 0',
                border: '1px solid rgba(81, 81, 81, 1)', borderRadius: '4px', padding: '8px 14px',
                overflow: "auto"
            }}>
                {values
                    .map((item) => (
                        <ListItem key={item._itemId}
                                  disablePadding
                                  secondaryAction={
                                      <IconButton edge="end" aria-label="remove" sx={{ padding: 0 }}>
                                          <RemoveCircle color="error" onClick={() => onDeleteClick(item._itemId)}/>
                                      </IconButton>}
                        >
                            <ListItemText id={item._itemId} primary={getItemLabel(item)} />
                        </ListItem>)
                    )}
            </List>
            {onAddClick &&
                <Button variant="outlined"
                        onClick={onAddClick}
                        size="small"
                        startIcon={<Add />}>
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
                    <UnwrappedFormList values={values} label={label} getItemLabel={getItemLabel} onDeleteClick={(itemId) => handleDeleteClick(itemId)} />
                </Grid>
            )}
            { !gridSize && (
                <UnwrappedFormList values={values} label={label} getItemLabel={getItemLabel} onDeleteClick={(itemId) => handleDeleteClick(itemId)} onAddClick={onAddClick} />
            )}
        </>
    );
}
