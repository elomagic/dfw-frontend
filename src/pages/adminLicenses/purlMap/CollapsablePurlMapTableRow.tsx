import {LicensePurlMap} from "../../../DTOs.ts";
import {useState} from "react";
import EditableTableRow from "./EditableTableRow.tsx";
import * as Rest from "../../../RestClient.ts";
import {RestEndpoint} from "../../../RestClient.ts";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../../auth/useAuth.ts";
import {toaster} from "../../../Toaster.ts";
import {TableCell, TableRow} from "../../../components/ui/table.tsx";
import {Collapsible, CollapsibleContent} from "../../../components/ui/collapsible.tsx";

interface CollapsablePurlMapTableRowProps {
    purlMap: LicensePurlMap
    onDeleteRequest: (pm: LicensePurlMap) => void;
}

export default function CollapsablePurlMapTableRow({ purlMap, onDeleteRequest }: Readonly<CollapsablePurlMapTableRowProps>) {

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
            <TableRow onClick={()=> setOpen(!open)}>
                <TableCell>{data.purlMatch}</TableCell>
                <TableCell>{data.spdxId}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                    <Collapsible open={open}>
                        <CollapsibleContent>
                            <EditableTableRow purlMap={data}
                                              onSaveClick={handleSaveClick}
                                              onDeleteRequest={() => onDeleteRequest(data)} />
                        </CollapsibleContent>
                    </Collapsible>
                </TableCell>
            </TableRow>
        </>
    );
}
