import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {LicensePurlMap} from "../../../DTOs.ts";
import {Collapse} from "@mui/material";
import {useState} from "react";
import EditableTableRow from "./EditableTableRow.tsx";
import * as Rest from "../../../RestClient.ts";
import {RestEndpoint} from "../../../RestClient.ts";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../../auth/useAuth.ts";
import {toaster} from "../../../Toaster.ts";

interface ComponentProps {
    purlMap: LicensePurlMap
    onDeleteRequest: (pm: LicensePurlMap) => void;
}

export default function CollapsablePurlMapTableRow({ purlMap, onDeleteRequest }: Readonly<ComponentProps>) {

    const { t } = useTranslation();
    const auth = useAuth();
    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState<LicensePurlMap>(purlMap);

    const handleSaveClick = (d: LicensePurlMap) => {
        Rest.patch(auth, RestEndpoint.LicensePurlMap, d)
            .then((res) => res.json())
            .then((dto: LicensePurlMap) => setData(dto))
            .then(() => toaster(t("successful-saved"), 'success'))
            .catch((err: Error) => toaster(t("saving-data-failed", { message: err.message}), 'error'));
    };

    return (
        <>
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#292929" }}
                onClick={()=> setOpen(!open)}
            >
                <TableCell>{data.purlMatch}</TableCell>
                <TableCell>{data.spdxId}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{height: 0}} colSpan={3}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <EditableTableRow purlMap={data}
                                          onSaveClick={handleSaveClick}
                                          onDeleteRequest={() => onDeleteRequest(data)} />
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
