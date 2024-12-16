import {useTranslation} from "react-i18next";
import {ReactNode, useEffect, useState} from "react";
import {ItemId} from "../DTOs.ts";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "../components/ui/dialog.tsx";
import {Button} from "../components/ui/button.tsx";
import {ScrollArea} from "../components/ui/scroll-area.tsx";
import {Label} from "../components/ui/label.tsx";
import {Checkbox} from "../components/ui/checkbox.tsx";

interface SelectItemDialogProps<T> {
    value: ItemId<T>[];
    selectables: ItemId<T>[];
    getItemLabel: (item: ItemId<T>) => ReactNode;
    open: boolean;
    handleClose: (cancel: boolean, items: ItemId<T>[]) => void;
}

export default function SelectItemDialogIdItem<T>({ open, handleClose, value, selectables, getItemLabel }: Readonly<SelectItemDialogProps<T>>) {

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
        <Dialog open={open} onOpenChange={(s) => !s && handleClose(true, resolveCheckedItems(selectables, checked))}>

            <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                <DialogHeader>
                    <DialogTitle>{t("select-items-dialog-title")}</DialogTitle>
                    <DialogDescription>{t("select-items-dialog-description")}</DialogDescription>
                </DialogHeader>

                <ScrollArea style={{ height: "400px", width: "100%" }}>
                    {selectables.map((item) => (
                        <div>
                            <Checkbox id={item._itemId} checked={checked.includes(item._itemId)} onCheckedChange={() => handleToggleItem(item)}/>
                            <Label htmlFor={item._itemId}>{getItemLabel(item)}</Label>
                        </div>
                    ))}
                </ScrollArea>

                <DialogFooter>
                    <Button variant="outline" onClick={() => handleClose(true, resolveCheckedItems(selectables, checked))}>{t("cancel")}</Button>
                    <Button onClick={() => handleClose(false, resolveCheckedItems(selectables, checked))}>
                        {t("ok")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
