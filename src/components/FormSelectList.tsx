import {
    Button,
    IconButton,
    List,
    ListItem,
    ListItemText
} from "@mui/material";
import {KeyLabelItem} from "./FormSelect.tsx";
import Grid from "@mui/material/Grid2";
import {Add, RemoveCircle} from "@mui/icons-material";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import SelectItemDialog from "./SelectItemDialog.tsx";
import {GridSize} from "@mui/material/Grid2/Grid2";

interface FormSelectListProps {
    value: string[];
    selectables: KeyLabelItem[];
    label: string;
    onChange: (selectedKeys: string[]) => void;
    gridSize?: GridSize;
}

export default function FormSelectList({ label, selectables, gridSize, onChange, value}: Readonly<FormSelectListProps>) {

    const { t } = useTranslation();
    const [ dialogOpen, setDialogOpen ] = useState<boolean>(false);
    const [ values, setValues ] = useState<string[]>(value);

    const handleCloseDialog = (cancel: boolean, keys: string[]) => {
        setDialogOpen(false);
        if (!cancel) {
            setValues(keys)
            onChange(keys);
        }
    }

    const handleAddClick = () => {
        setDialogOpen(true);
    }

    const handleDeleteClick = (key: string) => {
        onChange(selectables.filter(item => item.key !== key).map(item => item.key));
    }

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
                        {selectables.map((item) => (
                            <ListItem key={item.key}
                                      secondaryAction={
                                          <IconButton edge="end" aria-label="remove">
                                              <RemoveCircle color="error" onClick={() => handleDeleteClick(item.key)}/>
                                          </IconButton>
                                      }
                                      disablePadding>
                                <ListItemText id={item.key} primary={item.label} />
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
            <SelectItemDialog open={dialogOpen} handleClose={handleCloseDialog} value={values} selectables={selectables} />
        </>
    );
}
