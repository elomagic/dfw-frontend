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

interface FormSelectListProps {
    value: string[];
    selectables: KeyLabelItem[];
    label: string;
    onChange: (selectedKeys: string[]) => void;
    gridSize?: number;
}

export default function FormSelectList({ label, selectables, gridSize, onChange}: Readonly<FormSelectListProps>) {

    const { t } = useTranslation();

    const handleAddClick = () => {
        console.log("Not implemented yet");
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
        </>
    );
}
