import {UserAccount} from "../../../DTOs.ts";
import {useState} from "react";
import EditableTableRow from "./EditableTableRow.tsx";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../../auth/useAuth.ts";
import * as Rest from "../../../RestClient.ts";
import {RestEndpoint} from "../../../RestClient.ts";
import {toaster} from "../../../Toaster.ts";
import {TableCell, TableRow} from "../../../components/ui/table.tsx";
import {Check} from "lucide-react";
import {Collapsible, CollapsibleContent} from "../../../components/ui/collapsible.tsx";

interface CollapsableUserTableRowProps {
    user: UserAccount
    onDeleteRequest: (u: UserAccount) => void;
}

export default function CollapsableUserTableRow({ user, onDeleteRequest }: Readonly<CollapsableUserTableRowProps>) {

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
            <TableRow onClick={()=> setOpen(!open)}>
                <TableCell>{data.mailAddress}</TableCell>
                <TableCell>{data.enabled ? <Check color="success" /> : ""}</TableCell>
                <TableCell>{data.displayName}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                    <Collapsible open={open}>
                        <CollapsibleContent>
                            <EditableTableRow user={data}
                                              onSaveClick={handleSaveClick}
                                              onDeleteRequest={() => onDeleteRequest(data)} />
                        </CollapsibleContent>
                    </Collapsible>
                </TableCell>
            </TableRow>
        </>
    );
}
