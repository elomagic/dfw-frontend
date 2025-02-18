"use client"

import {useState} from "react";
import {useTranslation} from "react-i18next";
import TableCell from "@mui/material/TableCell";
import {Check} from "@mui/icons-material";
import {useAuth} from "@/auth/useAuth.ts";
import * as Rest from "../../../RestClient.ts";
import {toaster} from "@/Toaster.ts";
import { TableDataRow } from "@components/TableDataRow.tsx";
import {TablePanelRow} from "@components/TablePanelRow.tsx";
import {UserAccount} from "@/DTOs.ts";
import {EditableTableRow} from "./EditableTableRow.tsx";

interface ComponentProps {
    user: UserAccount
    onDeleteRequest: (u: UserAccount) => void;
}

export const CollapsableTableRow = ({ user, onDeleteRequest }: Readonly<ComponentProps>) => {

    const { t } = useTranslation();
    const auth = useAuth();
    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState<UserAccount>(user);

    const handleSaveClick = (d: UserAccount) => {
        Rest.patch<UserAccount>(auth, Rest.Endpoint.User, d)
            .then((dto: UserAccount) => setData(dto))
            .then(() => toaster(t("successful-saved"), 'success'))
            .catch((err: Error) => toaster(t("saving-data-failed", { message: err.message}), 'error'));
    };

    return (
        <>
            <TableDataRow onClick={()=> setOpen(!open)}>
                <TableCell>{data.mailAddress}</TableCell>
                <TableCell>{data.enabled ? <Check color="success" /> : ""}</TableCell>
                <TableCell>{data.displayName}</TableCell>
            </TableDataRow>
            <TablePanelRow open={open} colSpan={3}>
                <EditableTableRow user={data}
                                  onSaveClick={handleSaveClick}
                                  onDeleteRequest={() => onDeleteRequest(data)} />
            </TablePanelRow>
        </>
    );
}
