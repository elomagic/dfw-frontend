import {useTranslation} from "react-i18next";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {Checkbox, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {KeyLabelItem} from "./FormSelect.tsx";

interface SelectItemDialogProps {
    open: boolean;
    handleClose: (cancel: boolean, keys: string[]) => void;
    value: string[];
    selectables: KeyLabelItem[];
}

export default function SelectItemDialog({ open, handleClose, value, selectables }: Readonly<SelectItemDialogProps>) {

    const { t } = useTranslation();

    const [checked, setChecked] = useState<string[]>([]);

    const handleToggleItem = (item: KeyLabelItem) => {
        const currentIndex = checked.indexOf(item.key);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(item.key);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    }

    useEffect(() => {
        setChecked(value)
    }, [value]);

    return (
        <Dialog
            open={open}
            onClose={() => handleClose(true, checked)}
            PaperProps={{ sx: { backgroundImage: 'none' }}}
        >
            <DialogTitle>{t("select-items-dialog-title")}</DialogTitle>
            <DialogContent
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
            >
                <DialogContentText>
                    {t("select-items-dialog-description")}
                </DialogContentText>

                <List sx={{
                    width: '100%', height: 400, margin: '6px 0 6px 0',
                    border: '1px solid rgba(81, 81, 81, 1)', borderRadius: '4px', padding: '8px 14px',
                    overflow: "auto"
                }}>
                    {selectables.map((item) => {
                        const labelId = `list-item-${value}-label`;

                        return (
                            <ListItemButton
                                key={item.key}
                                role="listitem"
                                sx={{ p: 0 }}
                                onClick={() => handleToggleItem(item)}
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        checked={checked.includes(item.key)}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{
                                            'aria-labelledby': labelId,
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText  id={labelId} primary={item.label}/>
                            </ListItemButton>
                        );
                    })}
                </List>
            </DialogContent>
            <DialogActions sx={{ pb: 3, px: 3 }}>
                <Button onClick={() => handleClose(true, checked)}>{t("cancel")}</Button>
                <Button variant="contained" onClick={() => handleClose(false, checked)}>
                    {t("ok")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
