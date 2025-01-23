"use client"

import TableCell from "@mui/material/TableCell";
import {Check} from "@mui/icons-material";
import {Proxy} from "../../DTOs.ts";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../auth/useAuth.ts";
import * as Rest from "../../RestClient.ts";
import {Endpoint} from "../../RestClient.ts";
import {toaster} from "../../Toaster.ts";
import { TableDataRow } from "../../components/TableDataRow.tsx";
import {TablePanelRow} from "../../components/TablePanelRow.tsx";
import {ProxyTypeIcon} from "../../components/ProxyTypeIcon.tsx";
import {EditableTableRow} from "./EditableTableRow.tsx";

interface ComponentProps {
    proxy: Proxy;
    internalBaseUrl: string;
    onDeleteRequest: (r: Proxy) => void;
}

export const CollapsableTableRow = ({ proxy, internalBaseUrl, onDeleteRequest }: Readonly<ComponentProps>) => {

    const { t } = useTranslation();
    const auth = useAuth();
    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState<Proxy>(proxy);

    const handleSaveClick = (d: Proxy) => {
        Rest.patch<Proxy>(auth, Endpoint.Proxy, d)
            .then((dto: Proxy) => setData(dto))
            .then(() => toaster(t("successful-saved"), 'success'))
            .catch((err: Error) => toaster(t("saving-data-failed", { message: err.message}), 'error'));
    };

    return (
        <>
            <TableDataRow onClick={()=> setOpen(!open)}>
                <TableCell><ProxyTypeIcon type={data.type} /></TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.enabled ? <Check color="success" /> : ""}</TableCell>
                <TableCell>{data.description}</TableCell>
                <TableCell>{data.baseUri}</TableCell>
                <TableCell>{`${internalBaseUrl}/proxy/${data.name}`}</TableCell>
            </TableDataRow>
            <TablePanelRow colSpan={6} open={open}>
                <EditableTableRow proxy={data}
                                  onSaveClick={handleSaveClick}
                                  onDeleteRequest={() => onDeleteRequest(data)} />
            </TablePanelRow>
        </>
    );
}
