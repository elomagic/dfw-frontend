import TableCell from "@mui/material/TableCell";
import {Check} from "@mui/icons-material";
import TableRow from "@mui/material/TableRow";
import {Proxy} from "../../DTOs.ts";
import RepositoryTypeIcon from "../../components/RepositoryTypeIcon.tsx";
import {Collapse} from "@mui/material";
import {useState} from "react";
import EditableTableRow from "./EditableTableRow.tsx";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../auth/useAuth.ts";
import * as Rest from "../../RestClient.ts";
import {RestEndpoint} from "../../RestClient.ts";
import {toaster} from "../../Toaster.ts";

interface CollapsableTableRowProps {
    proxy: Proxy;
    internalBaseUrl: string;
    onDeleteRequest: (r: Proxy) => void;
}

export default function CollapsableTableRow({ proxy, internalBaseUrl, onDeleteRequest }: Readonly<CollapsableTableRowProps>) {

    const { t } = useTranslation();
    const auth = useAuth();
    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState<Proxy>(proxy);

    const handleSaveClick = (d: Proxy) => {
        Rest.patch(auth, RestEndpoint.Proxy, d)
            .then((res) => res.json())
            .then((dto: Proxy) => setData(dto))
            .then(() => toaster(t("successful-saved"), 'success'))
            .catch((err: Error) => toaster(t("saving-data-failed", { message: err.message}), 'error'));
    };

    return (
        <>
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#292929" }}
                onClick={()=> setOpen(!open)}
            >
                <TableCell><RepositoryTypeIcon type={data.type} /></TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.enabled ? <Check color="success" /> : ""}</TableCell>
                <TableCell>{data.description}</TableCell>
                <TableCell>{data.baseUri}</TableCell>
                <TableCell>{`${internalBaseUrl}/repository/${data.name}`}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <EditableTableRow proxy={data}
                                          onSaveClick={handleSaveClick}
                                          onDeleteRequest={() => onDeleteRequest(data)} />
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
