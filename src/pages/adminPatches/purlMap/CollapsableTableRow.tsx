"use client"

import TableCell from "@mui/material/TableCell";
import {LicensePurlMap} from "../../../DTOs.ts";
import {useState} from "react";
import EditableTableRow from "./EditableTableRow.tsx";
import * as Rest from "../../../RestClient.ts";
import {RestEndpoint} from "../../../RestClient.ts";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../../auth/useAuth.ts";
import {toaster} from "../../../Toaster.ts";
import {TableDataRow} from "../../../components/TableDataRow.tsx";
import {TablePanelRow} from "../../../components/TablePanelRow.tsx";

interface ComponentProps {
    purlMap: LicensePurlMap
    onDeleteRequest: (pm: LicensePurlMap) => void;
}

export default function CollapsableTableRow({ purlMap, onDeleteRequest }: Readonly<ComponentProps>) {

    const { t } = useTranslation();
    const auth = useAuth();
    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState<LicensePurlMap>(purlMap);

    const handleSaveClick = (d: LicensePurlMap) => {
        Rest.patch<LicensePurlMap>(auth, RestEndpoint.LicensePurlMap, d)
            .then((dto: LicensePurlMap) => setData(dto))
            .then(() => toaster(t("successful-saved"), 'success'))
            .catch((err: Error) => toaster(t("saving-data-failed", { message: err.message}), 'error'));
    };

    return (
        <>
            <TableDataRow onClick={()=> setOpen(!open)}>
                <TableCell>{data.purlMatch}</TableCell>
                <TableCell>{data.spdxId}</TableCell>
            </TableDataRow>
            <TablePanelRow open={open} colSpan={3}>
                <EditableTableRow purlMap={data}
                                  onSaveClick={handleSaveClick}
                                  onDeleteRequest={() => onDeleteRequest(data)} />
            </TablePanelRow>
        </>
    );
}
