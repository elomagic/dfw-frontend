"use client"

import {useState} from "react";
import {useTranslation} from "react-i18next";
import TableCell from "@mui/material/TableCell";
import {useAuth} from "@/auth/useAuth.ts";
import * as Rest from "../../../RestClient.ts";
import { toaster } from "@/Toaster.ts";
import { TableDataRow } from "@components/TableDataRow.tsx";
import {TablePanelRow} from "@components/TablePanelRow.tsx";
import {LicenseNameMap} from "@/DTOs.ts";
import {EditableTableRow} from "./EditableTableRow.tsx";

interface ComponentProps {
    nameMap: LicenseNameMap
    onDeleteRequest: (nm: LicenseNameMap) => void;
}

export const CollapsableTableRow = ({ nameMap, onDeleteRequest }: Readonly<ComponentProps>) => {

    const { t } = useTranslation();
    const auth = useAuth();
    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState<LicenseNameMap>(nameMap);

    const handleSaveClick = (d: LicenseNameMap) => {
        Rest.patch<LicenseNameMap>(auth, Rest.Endpoint.LicensePurlMap, d)
            .then((dto: LicenseNameMap) => setData(dto))
            .then(() => toaster(t("successful-saved"), 'success'))
            .catch((err: Error) => toaster(t("saving-data-failed", { message: err.message}), 'error'));
    };

    return (
        <>
            <TableDataRow onClick={()=> setOpen(!open)}>
                <TableCell>{data.nameMatch}</TableCell>
                <TableCell>{data.spdxId}</TableCell>
            </TableDataRow>
            <TablePanelRow open={open} colSpan={3}>
                <EditableTableRow nameMap={data}
                                  onSaveClick={handleSaveClick}
                                  onDeleteRequest={() => onDeleteRequest(data)} />
            </TablePanelRow>
        </>
    );
}
