import {useCallback, useEffect, useState} from "react";
import {LicenseViolation} from "../../DTOs.ts";
import * as Rest from "../../RestClient.ts";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../auth/useAuth.ts";
import YesNoDialog from "../../components/YesNoDialog.tsx";
import TableHeaderControls from "../../components/TableHeaderControls.tsx";
import CollapsableTableRow from "./CollapsableTableRow.tsx";
import {toaster} from "../../Toaster.ts";
import {Table, TableBody, TableCell, TableHead, TableRow} from "../../components/ui/table.tsx";
import {ContentTile} from "../../components/ContentTile.tsx";

export default function LicenseIssuesView() {

    const { t } = useTranslation();
    const auth = useAuth();
    const [ rows, setRows ] = useState<LicenseViolation[]>([]);
    const [ filter, setFilter ] = useState<string>("");
    const [ deleteOpen, setDeleteOpen ] = useState<boolean>(false);
    const [ selectedEntity, setSelectedEntity ] = useState<LicenseViolation>();

    const refresh = useCallback(() => {
        Rest.get(auth, Rest.RestEndpoint.LicenseViolation)
            .then((res) => res.json())
            .then((reps: LicenseViolation[]) => {
                setRows(reps);
            })
            .catch((err: Error) => {
                setRows([])
                toaster(t("getting-data-failed",  { message: err.message }), 'error');
            });
    }, [t, auth]);

    const handleDeleteRequest = (r: LicenseViolation) => {
        setSelectedEntity(r);
        setDeleteOpen(true);
    }

    const handleDelete = () => {
        Rest.deleteResource(auth, Rest.RestEndpoint.LicenseViolation, selectedEntity?.id)
            .then(() => refresh())
            .catch((err: Error) => toaster(t("deleting-failed", { message: err.message }), 'error'))
            .finally(() => setDeleteOpen(false))
    }

    useEffect(() => {
        refresh();
    }, [refresh]);

    return (
        <ContentTile>
            <TableHeaderControls onFilterChanged={f => setFilter(f)}
                                 onRefresh={refresh}
            />

            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>{t("purl")}</TableCell>
                        <TableCell>{t("licenses")}</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows
                        .filter(r => ("" === filter || r.purl.toLowerCase().includes(filter)))
                        .map((row) => (
                            <CollapsableTableRow key={row.id}
                                                 licenseViolation={row}
                                                 onDeleteRequest={(id) => handleDeleteRequest(id)}
                            />
                        ))
                    }
                </TableBody>
            </Table>

            <YesNoDialog title={t("delete-repository")}
                         text={t("Do ya really want to delete the issue with PURL {{purl}}", { purl: selectedEntity?.purl})}
                         open={deleteOpen}
                         onYesClick={() => handleDelete()}
                         onNoClick={() => setDeleteOpen(false)}
            />
        </ContentTile>
    );
}
