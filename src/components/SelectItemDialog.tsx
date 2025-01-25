"use client"

import {useTranslation} from "react-i18next";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {ReactNode, useEffect, useState} from "react";
import {
    Box,
    Checkbox,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TextField,
    Tooltip
} from "@mui/material";
import {ItemId} from "../DTOs.ts";
import {BsToggles} from "react-icons/bs";

interface ComponentProps<T> {
    value: ItemId<T>[];
    selectables: ItemId<T>[];
    getItemLabel: (item: ItemId<T>) => ReactNode;
    open: boolean;
    handleClose: (cancel: boolean, items: ItemId<T>[]) => void;
}

export const SelectItemDialog = <T,> ({ open, handleClose, value, selectables, getItemLabel }: Readonly<ComponentProps<T>>) => {

    const { t } = useTranslation();

    const [checked, setChecked] = useState<string[]>([]);
    const [filter, setFilter] = useState<string>("");

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

    const handleToggleAll = () => {
        if (checked.length === selectables.length) {
            setChecked([]);
        } else {
            const allItems = selectables.map(item => item._itemId);
            setChecked(allItems);
        }
    }

    useEffect(() => setChecked(value.map(item => item._itemId)), [value]);

    // Reset dialog on open
    useEffect(() => setFilter(""), [open]);

    return (
        <Dialog
            open={open}
            onClose={() => handleClose(true, resolveCheckedItems(selectables, checked))}
            slotProps={{
                paper: {
                    sx: { width: '400px', backgroundImage: 'none' }
                }
            }}
        >
            <DialogTitle>{t("select-items-dialog-title")}</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%', paddingBottom: 0 }}>
                <DialogContentText>{t("select-items-dialog-description")}</DialogContentText>

                <Box display="flex" flexDirection="row">
                    <TextField size="small"
                               value={filter}
                               placeholder={t("filter")}
                               fullWidth
                               onChange={e => setFilter(e.target.value)}
                    />

                    <Tooltip title={t("toggle-all")}>
                        <IconButton aria-label="toggle-all" onClick={handleToggleAll}><BsToggles /></IconButton>
                    </Tooltip>
                </Box>

                <List sx={{
                    width: '100%', height: 400,
                    border: '1px solid rgba(81, 81, 81, 1)', borderRadius: '4px',
                    overflow: "auto"
                }}>
                    {selectables
                        .filter(item => ("" === filter || (getItemLabel(item) as string).includes(filter)))
                        .map((item) => {
                        const labelId = `list-item-${value}-label`;

                        return (
                            <ListItemButton
                                key={item._itemId}
                                sx={{ p: 0, height: "2em" }}
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
                                <ListItemText  id={labelId} primary={getItemLabel(item)}/>
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
