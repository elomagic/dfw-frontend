import {
    Button,
    IconButton,
    List,
    ListItem,
    ListItemText
} from "@mui/material";
import {KeyLabelItem} from "./FormFieldComponents.tsx";
import Grid from "@mui/material/Grid2";
import {Add, Garage} from "@mui/icons-material";
import {useTranslation} from "react-i18next";

interface FormSelectListProps {
    value: string[];
    selectables: KeyLabelItem[];
    label: string;
    onChange: (selectedKeys: string[]) => void;
    gridSize?: number;
}

export default function FormSelectList({ label, selectables, gridSize}: Readonly<FormSelectListProps>) {

    const { t } = useTranslation();

    const handleAddClick = () => {
        console.log("Not implemented yet");
    }

    return (
        <>
            { gridSize && (
                <Grid size={gridSize}>
                    {label}
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {selectables.map((item) => (
                            <ListItem key={item.key}
                                      secondaryAction={
                                          <IconButton edge="end" aria-label="remove">
                                              <Garage />
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
