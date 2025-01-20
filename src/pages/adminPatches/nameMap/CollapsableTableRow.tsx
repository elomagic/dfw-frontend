"use client"

import TableCell from "@mui/material/TableCell";
import {LicenseNameMap} from "../../../DTOs.ts";
import {useState} from "react";
import EditableTableRow from "./EditableTableRow.tsx";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../../auth/useAuth.ts";
import * as Rest from "../../../RestClient.ts";
import {RestEndpoint} from "../../../RestClient.ts";
import { toaster } from "../../../Toaster.ts";
import { TableDataRow } from "../../../components/TableDataRow.tsx";
import {TablePanelRow} from "../../../components/TablePanelRow.tsx";

interface ComponentProps {
    nameMap: LicenseNameMap
    onDeleteRequest: (nm: LicenseNameMap) => void;
}

export default function CollapsableTableRow({ nameMap, onDeleteRequest }: Readonly<ComponentProps>) {

    const { t } = useTranslation();
    const auth = useAuth();
    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState<LicenseNameMap>(nameMap);

    const handleSaveClick = (d: LicenseNameMap) => {
        Rest.patch<LicenseNameMap>(auth, RestEndpoint.LicensePurlMap, d)
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
