import {Repository} from "../../DTOs.ts";
import RepositoryTypeIcon from "../../components/RepositoryTypeIcon.tsx";
import {useState} from "react";
import EditableTableRow from "./EditableTableRow.tsx";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../auth/useAuth.ts";
import * as Rest from "../../RestClient.ts";
import {RestEndpoint} from "../../RestClient.ts";
import {toaster} from "../../Toaster.ts";
import {TableCell, TableRow} from "../../components/ui/table.tsx";
import {Check} from "lucide-react";
import {Collapsible, CollapsibleContent} from "../../components/ui/collapsible.tsx";

interface CollapsableTableRowProps {
    repository: Repository;
    internalBaseUrl: string;
    onDeleteRequest: (r: Repository) => void;
}

export default function CollapsableTableRow({ repository, internalBaseUrl, onDeleteRequest }: Readonly<CollapsableTableRowProps>) {

    const { t } = useTranslation();
    const auth = useAuth();
    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState<Repository>(repository);

    const handleSaveClick = (d: Repository) => {
        Rest.patch(auth, RestEndpoint.Repository, d)
            .then((res) => res.json())
            .then((dto: Repository) => setData(dto))
            .then(() => toaster(t("successful-saved"), 'success'))
            .catch((err: Error) => toaster(t("saving-data-failed", { message: err.message}), 'error'));
    };

    return (
        <>
            <TableRow onClick={()=> setOpen(!open)}>
                <TableCell><RepositoryTypeIcon type={data.type} /></TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.enabled ? <Check color="success" /> : ""}</TableCell>
                <TableCell>{data.description}</TableCell>
                <TableCell>{data.baseUri}</TableCell>
                <TableCell>{`${internalBaseUrl}/repository/${data.name}`}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                    <Collapsible open={open}>
                        <CollapsibleContent>
                            <EditableTableRow repository={data}
                                              onSaveClick={handleSaveClick}
                                              onDeleteRequest={() => onDeleteRequest(data)} />
                        </CollapsibleContent>
                    </Collapsible>
                </TableCell>
            </TableRow>
        </>
    );
}
