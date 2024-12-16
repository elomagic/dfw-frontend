import {Configuration, ConfigurationKeyMeta} from "../../DTOs.ts";
import {useState} from "react";
import EditableTableRow from "./EditableTableRow.tsx";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../auth/useAuth.ts";
import * as Rest from "../../RestClient.ts";
import {RestEndpoint} from "../../RestClient.ts";
import {FaHourglass} from "react-icons/fa6";
import {ImCheckboxChecked, ImCheckboxUnchecked} from "react-icons/im";
import {toaster} from "../../Toaster.ts";
import {TableCell, TableRow} from "../../components/ui/table.tsx";
import {Collapsible, CollapsibleContent} from "../../components/ui/collapsible.tsx";

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
            .then(() => toaster(t("successful-saved"), 'success'))
            .catch((err: Error) => toaster(t("saving-data-failed", { message: err.message}), 'error'));
    };

    return (
        <>
            <TableRow onClick={()=> setOpen(!open)}>
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
                    <Collapsible open={open}>
                        <CollapsibleContent>
                            <EditableTableRow configuration={data}
                                              keyMeta={keyMeta}
                                              onSaveClick={handleSaveClick}
                                              onResetRequest={() => onResetRequest(data)} />
                        </CollapsibleContent>
                    </Collapsible>
                </TableCell>
            </TableRow>
        </>
    );
}
