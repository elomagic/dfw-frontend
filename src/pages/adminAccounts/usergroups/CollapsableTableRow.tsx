"use client"

import {useState} from "react";
import {useTranslation} from "react-i18next";
import TableCell from "@mui/material/TableCell";
import {useAuth} from "@/auth/useAuth.ts";
import * as Rest from "../../../RestClient.ts";
import { toaster } from "@/Toaster.ts";
import { TableDataRow } from "@components/TableDataRow.tsx";
import {TablePanelRow} from "@components/TablePanelRow.tsx";
import {UserAccountGroup} from "@/DTOs.ts";
import {EditableTableRow} from "./EditableTableRow.tsx";

interface ComponentProps {
    userGroup: UserAccountGroup
    onDeleteRequest: (ug: UserAccountGroup) => void;
}

export const CollapsableTableRow = ({ userGroup, onDeleteRequest }: Readonly<ComponentProps>) => {

    const { t } = useTranslation();
    const auth = useAuth();
    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState<UserAccountGroup>(userGroup);

    const handleSaveClick = (d: UserAccountGroup) => {
        Rest.patch<UserAccountGroup>(auth, Rest.Endpoint.UserGroup, d)
            .then((dto: UserAccountGroup) => setData(dto))
            .then(() => toaster(t("successful-saved"), 'success'))
            .catch((err: Error) => toaster(t("saving-data-failed", { message: err.message}), 'error'));
    };

    return (
        <>
            <TableDataRow onClick={()=> setOpen(!open)}>
                <TableCell>{data.name}</TableCell>
            </TableDataRow>
            <TablePanelRow open={open} colSpan={1}>
                <EditableTableRow group={data}
                                  onSaveClick={handleSaveClick}
                                  onDeleteRequest={() => onDeleteRequest(data)} />
            </TablePanelRow>
        </>
    );
}
