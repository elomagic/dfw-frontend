import {LicenseNameMap} from "../../../DTOs.ts";
import {useState} from "react";
import EditableTableRow from "./EditableTableRow.tsx";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../../auth/useAuth.ts";
import * as Rest from "../../../RestClient.ts";
import {RestEndpoint} from "../../../RestClient.ts";
import { toaster } from "../../../Toaster.ts";
import {TableCell, TableRow} from "../../../components/ui/table.tsx";
import {Collapsible, CollapsibleContent} from "../../../components/ui/collapsible.tsx";

interface CollapsableNameMapTableRowProps {
    nameMap: LicenseNameMap
    onDeleteRequest: (nm: LicenseNameMap) => void;
}

export default function CollapsableNameMapTableRow({ nameMap, onDeleteRequest }: Readonly<CollapsableNameMapTableRowProps>) {

    const { t } = useTranslation();
    const auth = useAuth();
    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState<LicenseNameMap>(nameMap);

    const handleSaveClick = (d: LicenseNameMap) => {
        Rest.patch(auth, RestEndpoint.LicensePurlMap, d)
            .then((res) => res.json())
            .then((dto: LicenseNameMap) => setData(dto))
            .then(() => toaster(t("successful-saved"), 'success'))
            .catch((err: Error) => toaster(t("saving-data-failed", { message: err.message}), 'error'));
    };

    return (
        <>
            <TableRow onClick={()=> setOpen(!open)}>
                <TableCell>{data.nameMatch}</TableCell>
                <TableCell>{data.spdxId}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                    <Collapsible open={open}>
                        <CollapsibleContent>
                            <EditableTableRow nameMap={data}
                                              onSaveClick={handleSaveClick}
                                              onDeleteRequest={() => onDeleteRequest(data)} />
                        </CollapsibleContent>
                    </Collapsible>
                </TableCell>
            </TableRow>
        </>
    );
}
