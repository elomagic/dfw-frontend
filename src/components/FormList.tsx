import {useTranslation} from "react-i18next";
import {ReactNode, useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import {ItemId} from "../DTOs.ts";
import {useAuth} from "../auth/useAuth.ts";
import {Button} from "../components/ui/button.tsx";
import {MdDeleteForever} from "react-icons/md";
import {IoMdAddCircleOutline} from "react-icons/io";
import {GridItem, GridSize} from "../components/Grids.tsx";
import {FormItem} from "../components/FormItem.tsx";
import {ScrollArea} from "../components/ui/scroll-area.tsx";

interface UnwrappedFormListProps<T> {
    values: ItemId<T>[];
    label: string;
    editRole?: string;
    gridSize?: GridSize;
    getItemLabel: (item: T) => ReactNode;
    onAddClick?: () => void;
    onDeleteClick: (itemId: string) => void;
}

function UnwrappedFormList<T>({ values, label, getItemLabel, editRole, onAddClick, onDeleteClick }: Readonly<UnwrappedFormListProps<T>>) {

    const auth = useAuth();
    const { t } = useTranslation();

    return (
        <>
        <FormItem label={label}>
            <ScrollArea style={{ width: '100%', minHeight: '32px', maxHeight: '100px', overflow: "auto", padding: 0}}>
                {values.map((item) => (
                    <div>
                        <label>{getItemLabel(item)}</label>
                        { (editRole === undefined || auth.roles.includes(editRole)) && <Button size="icon"
                                aria-label="remove"
                                color="error"
                                onClick={() => onDeleteClick(item._itemId)}>
                            <MdDeleteForever />
                        </Button>
                        }
                    </div>
                ))}
            </ScrollArea>
        </FormItem>
            { (editRole === undefined || auth.roles.includes(editRole)) && onAddClick &&
                    <Button variant="outline" onClick={onAddClick} size="sm">
                        <IoMdAddCircleOutline />
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
                <GridItem size={gridSize}>
                    <UnwrappedFormList values={values} label={label} getItemLabel={getItemLabel} onDeleteClick={(itemId) => handleDeleteClick(itemId)} onAddClick={onAddClick} />
                </GridItem>
            )}
            { !gridSize && (
                <UnwrappedFormList values={values} label={label} getItemLabel={getItemLabel} onDeleteClick={(itemId) => handleDeleteClick(itemId)} onAddClick={onAddClick} />
            )}
        </>
    );
}
