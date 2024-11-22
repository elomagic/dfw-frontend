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
import {GridSize} from "@mui/material/Grid2/Grid2";

interface FormListProps<T> {
    value: T[];
    label: string;
    keyExtractor: (item: T) => string;
    labelExtractor: (item: T) => string;
    onChange: (selected: T[]) => void;
    onAddClick?: () => void;
    gridSize?: GridSize;
}

export default function FormList<T>({ value, label, keyExtractor, labelExtractor, gridSize, onChange, onAddClick }: Readonly<FormListProps<T>>) {

    const { t } = useTranslation();
    const [ values, setValues ] = useState<T[]>([]);

    const handleDeleteClick = (key: string) => {
        const v = values.filter(item => keyExtractor(item) !== key);
        onChange(v);
    }

    useEffect(() => {
        setValues(value);
    }, [value]);

    return (
        <>
            { gridSize && (
                <Grid size={gridSize}>
                    {label}
                    <List sx={{
                        width: '100%', minHeight: '56px', maxHeight: '200px', margin: '6px 0 6px 0',
                        border: '1px solid rgba(81, 81, 81, 1)', borderRadius: '4px', padding: '8px 14px',
                        overflow: "auto"
                    }}>
                        {values
                            .map((item) => (
                                <ListItem key={keyExtractor(item)}
                                          disablePadding
                                          secondaryAction={
                                                <IconButton edge="end" aria-label="remove">
                                                    <RemoveCircle color="error" onClick={() => handleDeleteClick(keyExtractor(item))}/>
                                                </IconButton>}
                                >
                                <ListItemText id={keyExtractor(item)} primary={labelExtractor(item)} />
                            </ListItem>)
                        )}
                    </List>
                    {onAddClick && <Button variant="outlined"
                            onClick={onAddClick}
                            size="small"
                            startIcon={<Add />}>
                        {t("add")}
                    </Button>
                    }
                </Grid>
            )}
        </>
    );
}
