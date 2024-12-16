import {useTranslation} from "react-i18next";
import {ReactNode, useEffect, useState} from "react";
import SelectItemDialog from "./SelectItemDialog.tsx";
import {ItemId} from "../DTOs.ts";
import {useAuth} from "../auth/useAuth.ts";
import {Button} from "../components/ui/button.tsx";
import {IoMdAddCircleOutline} from "react-icons/io";
import {MdDeleteForever} from "react-icons/md";
import {GridItem, GridSize} from "../components/Grids.tsx";
import {FormItem} from "../components/FormItem.tsx";
import {ScrollArea} from "../components/ui/scroll-area.tsx";

interface UnwrappedFormSelectListProps<T> {
    values: ItemId<T>[];
    label: string;
    editRole?: string;
    getItemLabel: (item: T) => ReactNode;
    onAddClick: () => void;
    onDeleteClick: (itemId: ItemId<T>) => void;
}

function UnwrappedFormSelectList<T>({ values, getItemLabel, label, editRole, onAddClick, onDeleteClick }: Readonly<UnwrappedFormSelectListProps<T>>) {

    const auth = useAuth();
    const { t } = useTranslation();

    return (
        <>
            <FormItem label={label}>
                <ScrollArea style={{width: '100%', minHeight: '32px', height: 300, overflow: "auto", padding: 0 }}>
                    {values.map((item) => (
                        <div>
                            <label>{getItemLabel(item)}</label>
                            { (editRole === undefined || auth.roles.includes(editRole)) && <Button
                                size="icon"
                                aria-label="remove"
                                color="error"
                                onClick={() => onDeleteClick(item)}>
                                    <MdDeleteForever />
                            </Button>
                            }
                        </div>
                    ))}
                </ScrollArea>

            </FormItem>

            { (editRole === undefined || auth.roles.includes(editRole)) &&
                <Button variant="outline" onClick={onAddClick} size="sm">
                    <IoMdAddCircleOutline />
                    {t("add")}
                </Button>
            }
        </>
    );
}

interface FormSelectListProps<T> {
    value: T[];
    selectables: T[];
    label: string;
    editRole?: string;
    gridSize?: GridSize;
    getItemId: (item: T) => string;
    getItemLabel: (item: T) => ReactNode;
    onChange: (selected: T[]) => void;

}

export default function FormSelectList<T> ({ value, selectables, label, editRole, gridSize, onChange, getItemId, getItemLabel }: Readonly<FormSelectListProps<T>>) {

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
        setValues(value.map(item => ({ ...item, _itemId: getItemId(item) })));
    }, [getItemId, value]);

    return (
        <>
            { gridSize && (
                <GridItem size={gridSize}>
                    <UnwrappedFormSelectList values={values}
                                             getItemLabel={getItemLabel}
                                             label={label}
                                             editRole={editRole}
                                             onAddClick={handleAddClick}
                                             onDeleteClick={(item) => handleDeleteClick(item._itemId)} />
                </GridItem>
            )}
            { !gridSize && (
                <UnwrappedFormSelectList values={values}
                                         getItemLabel={getItemLabel}
                                         label={label}
                                         editRole={editRole}
                                         onAddClick={handleAddClick}
                                         onDeleteClick={(item) => handleDeleteClick(item._itemId)} />
            )}
            <SelectItemDialog<ItemId<T>>
                open={dialogOpen}
                handleClose={handleCloseDialog}
                value={values}
                selectables={selectables.map(item => ({ ...item, _itemId: getItemId(item) }))}
                getItemLabel={(item => getItemLabel(item))}
            />
        </>
    );
}
