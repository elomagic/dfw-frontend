"use client"

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {License, LicenseGroup} from "../../DTOs.ts";
import {Collapse} from "@mui/material";
import {useState} from "react";
import EditableTableRow from "./EditableTableRow.tsx";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../auth/useAuth.ts";
import * as Rest from "../../RestClient.ts";
import {RestEndpoint} from "../../RestClient.ts";
import {toaster} from "../../Toaster.ts";

interface ComponentProps {
    licenseGroup: LicenseGroup;
    licenses: License[];
    onDeleteRequest: (r: LicenseGroup) => void;
}

export default function CollapsableTableRow({ licenseGroup, licenses, onDeleteRequest }: Readonly<ComponentProps>) {

    const { t } = useTranslation();
    const auth = useAuth();
    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState<LicenseGroup>(licenseGroup);

    const handleSaveClick = (d: LicenseGroup) => {
        Rest.patch(auth, RestEndpoint.LicenseGroup, d)
            .then((res) => res.json())
            .then((dto: LicenseGroup) => setData(dto))
            .then(() => toaster(t("successful-saved"), 'success'))
            .catch((err: Error) => toaster(t("saving-data-failed", { message: err.message}), 'error'));
    };

    return (
        <>
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#292929" }}
                onClick={()=> setOpen(!open)}
            >
                <TableCell>{data.name}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{height: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <EditableTableRow licenseGroup={data}
                                          licenses={licenses}
                                          onSaveClick={handleSaveClick}
                                          onDeleteRequest={() => onDeleteRequest(data)} />
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
