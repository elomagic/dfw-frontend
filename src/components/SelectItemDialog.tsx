import {useTranslation} from "react-i18next";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {Checkbox, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {ItemId} from "./FormSelect.tsx";

interface SelectItemDialogProps<T> {
    open: boolean;
    handleClose: (cancel: boolean, items: T[]) => void;
    value: ItemId<T>[];
    labelItemExtractor: (item: T) => string;
    selectables: ItemId<T>[];
}

export default function SelectItemDialog<T>({ open, handleClose, value, selectables, labelItemExtractor }: Readonly<SelectItemDialogProps<T>>) {

    const { t } = useTranslation();

    const [checked, setChecked] = useState<string[]>([]);

    const resolveCheckedItems = (allItems: ItemId<T>[], checked: string[]): ItemId<T>[] => {
        return allItems.filter(item => checked.indexOf(item._itemId) !== -1);
    }

    const handleToggleItem = (item: ItemId<T>) => {
        const currentIndex = checked.indexOf(item._itemId);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(item._itemId);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    }

    useEffect(() => {
        setChecked(value.map(item => item._itemId))
    }, [value]);

    return (
        <Dialog
            open={open}
            onClose={() => handleClose(true, resolveCheckedItems(selectables, checked))}
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
                                key={item._itemId}
                                role="listitem"
                                sx={{ p: 0 }}
                                onClick={() => handleToggleItem(item)}
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        checked={checked.includes(item._itemId)}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{
                                            'aria-labelledby': labelId,
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText  id={labelId} primary={labelItemExtractor(item)}/>
                            </ListItemButton>
                        );
                    })}
                </List>
            </DialogContent>
            <DialogActions sx={{ pb: 3, px: 3 }}>
                <Button onClick={() => handleClose(true, resolveCheckedItems(selectables, checked))}>{t("cancel")}</Button>
                <Button variant="contained" onClick={() => handleClose(false, resolveCheckedItems(selectables, checked))}>
                    {t("ok")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
