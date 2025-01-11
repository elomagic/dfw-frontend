import TableCell from "@mui/material/TableCell";
import {Check} from "@mui/icons-material";
import TableRow from "@mui/material/TableRow";
import {UserAccount} from "../../../DTOs.ts";
import {Collapse} from "@mui/material";
import {useState} from "react";
import EditableTableRow from "./EditableTableRow.tsx";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../../auth/useAuth.ts";
import * as Rest from "../../../RestClient.ts";
import {RestEndpoint} from "../../../RestClient.ts";
import {toaster} from "../../../Toaster.ts";

interface ComponentProps {
    user: UserAccount
    onDeleteRequest: (u: UserAccount) => void;
}

export default function CollapsableUserTableRow({ user, onDeleteRequest }: Readonly<ComponentProps>) {

    const { t } = useTranslation();
    const auth = useAuth();
    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState<UserAccount>(user);

    const handleSaveClick = (d: UserAccount) => {
        Rest.patch(auth, RestEndpoint.User, d)
            .then((res) => res.json())
            .then((dto: UserAccount) => setData(dto))
            .then(() => toaster(t("successful-saved"), 'success'))
            .catch((err: Error) => toaster(t("saving-data-failed", { message: err.message}), 'error'));
    };

    return (
        <>
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#292929" }}
                onClick={()=> setOpen(!open)}
            >
                <TableCell>{data.mailAddress}</TableCell>
                <TableCell>{data.enabled ? <Check color="success" /> : ""}</TableCell>
                <TableCell>{data.displayName}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{height: 0}} colSpan={3}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <EditableTableRow user={data}
                                          onSaveClick={handleSaveClick}
                                          onDeleteRequest={() => onDeleteRequest(data)} />
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
