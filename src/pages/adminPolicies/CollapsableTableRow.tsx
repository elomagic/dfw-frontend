"use client"

import TableCell from "@mui/material/TableCell";
import {Check} from "@mui/icons-material";
import {LicenseGroup, Policy} from "../../DTOs.ts";
import {useState} from "react";
import EditableTableRow from "./EditableTableRow.tsx";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../auth/useAuth.ts";
import * as Rest from "../../RestClient.ts";
import {Endpoint} from "../../RestClient.ts";
import {toaster} from "../../Toaster.ts";
import {TableDataRow} from "../../components/TableDataRow.tsx";
import {TablePanelRow} from "../../components/TablePanelRow.tsx";

interface ComponentProps {
    policy: Policy;
    onDeleteRequest: (r: Policy) => void;
    licenseGroups: LicenseGroup[];
}

export default function CollapsableTableRow({ policy, licenseGroups, onDeleteRequest }: Readonly<ComponentProps>) {

    const { t } = useTranslation();
    const auth = useAuth();
    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState<Policy>(policy);

    const handleSaveClick = (d: Policy) => {
        Rest.patch<Policy>(auth, Endpoint.Policy, d)
            .then((dto: Policy) => setData(dto))
            .then(() => toaster(t("successful-saved"), 'success'))
            .catch((err: Error) => toaster(t("saving-data-failed", { message: err.message}), 'error'));
    };

    return (
        <>
            <TableDataRow onClick={()=> setOpen(!open)}>
                <TableCell>{data.enabled ? <Check color="success" /> : ""}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.violationState}</TableCell>
                <TableCell>{data.conditions?.length}</TableCell>
            </TableDataRow>
            <TablePanelRow open={open} colSpan={5}>
                <EditableTableRow policy={data}
                                  licenseGroups={licenseGroups}
                                  onSaveClick={handleSaveClick}
                                  onDeleteRequest={() => onDeleteRequest(data)} />
            </TablePanelRow>
        </>
    );
}
