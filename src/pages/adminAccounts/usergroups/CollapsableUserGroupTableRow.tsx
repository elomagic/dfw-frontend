import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {UserAccountGroup} from "../../../DTOs.ts";
import {Collapse} from "@mui/material";
import {useState} from "react";
import EditableTableRow from "./EditableTableRow.tsx";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../../auth/useAuth.ts";
import * as Rest from "../../../RestClient.ts";
import {RestEndpoint} from "../../../RestClient.ts";
import { toaster } from "../../../Toaster.ts";

interface CollapsableUserGroupTableRowProps {
    userGroup: UserAccountGroup
    onDeleteRequest: (ug: UserAccountGroup) => void;
}

export default function CollapsableUserGroupTableRow({ userGroup, onDeleteRequest }: Readonly<CollapsableUserGroupTableRowProps>) {

    const { t } = useTranslation();
    const auth = useAuth();
    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState<UserAccountGroup>(userGroup);

    const handleSaveClick = (d: UserAccountGroup) => {
        Rest.patch(auth, RestEndpoint.UserGroup, d)
            .then((res) => res.json())
            .then((dto: UserAccountGroup) => setData(dto))
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
                <TableCell sx={{height: 0}} colSpan={1}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <EditableTableRow group={data}
                                          onSaveClick={handleSaveClick}
                                          onDeleteRequest={() => onDeleteRequest(data)} />
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
