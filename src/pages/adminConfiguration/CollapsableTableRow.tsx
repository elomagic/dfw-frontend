import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {Configuration, ConfigurationKeyMeta} from "../../DTOs.ts";
import {Collapse} from "@mui/material";
import {useState} from "react";
import EditableTableRow from "./EditableTableRow.tsx";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../auth/useAuth.ts";
import * as Rest from "../../RestClient.ts";
import {RestEndpoint} from "../../RestClient.ts";
import {enqueueSnackbar} from "notistack";
import {FaHourglass} from "react-icons/fa6";
import {ImCheckboxChecked, ImCheckboxUnchecked} from "react-icons/im";

interface CollapsableTableRowProps {
    configuration: Configuration;
    keyMeta: ConfigurationKeyMeta | undefined;
    onResetRequest: (r: Configuration) => void;
}

export default function CollapsableTableRow({ configuration, keyMeta, onResetRequest }: Readonly<CollapsableTableRowProps>) {

    const { t } = useTranslation();
    const auth = useAuth();
    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState<Configuration>(configuration);

    const handleSaveClick = (d: Configuration) => {
        Rest.put(auth, RestEndpoint.Configuration, d)
            .then((res) => res.json())
            .then((dto: Configuration) => setData(dto))
            .then(() => enqueueSnackbar(t("successful-saved"), { variant: 'success'} ))
            .catch((err: Error) => enqueueSnackbar(t("saving-data-failed", { message: err.message}), { variant: 'error'} ));
    };

    return (
        <>
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#292929" }}
                onClick={()=> setOpen(!open)}
            >
                <TableCell>{data.key.replace(/_/g, " » ")}</TableCell>
                <TableCell>
                    { !keyMeta && <FaHourglass />}
                    {
                        keyMeta && !keyMeta.secret ? (keyMeta.dataType === "BOOLEAN" ? (data.value === "true" ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />) : data.value)
                            : "******"
                    }
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <EditableTableRow configuration={data}
                                          keyMeta={keyMeta}
                                          onSaveClick={handleSaveClick}
                                          onResetRequest={() => onResetRequest(data)} />
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
