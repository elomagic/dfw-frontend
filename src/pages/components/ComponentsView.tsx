import {useCallback, useEffect, useState} from "react";
import {Component} from "../../DTOs.ts";
import * as Rest from "../../RestClient.ts";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../auth/useAuth.ts";
import TableHeaderControls from "../../components/TableHeaderControls.tsx";
import ComponentTableRow from "./ComponentTableRow.tsx";
import {toaster} from "../../Toaster.ts";
import {Table, TableBody, TableCell, TableHead, TableRow} from "../../components/ui/table.tsx";
import {ContentTile} from "../../components/ContentTile.tsx";

export default function ComponentsView() {

    const { t } = useTranslation();
    const auth = useAuth();
    const [ rows, setRows ] = useState<Component[]>([]);
    const [ filter, setFilter ] = useState<string>("");

    const refresh = useCallback(() => {
        Rest.get(auth, Rest.RestEndpoint.Component)
            .then((res) => res.json())
            .then((reps: Component[]) => {
                setRows(reps);
            })
            .catch((err: Error) => {
                setRows([])
                toaster(t("getting-data-failed",  { message: err.message }), 'error');
            });
    }, [t, auth]);

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
                        <TableCell width={"60px"}>{t("type")}</TableCell>
                        <TableCell>{t("purl")}</TableCell>
                        <TableCell>{t("namespace")}</TableCell>
                        <TableCell>{t("name")}</TableCell>
                        <TableCell>{t("version")}</TableCell>
                        <TableCell>{t("licenses")}</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows
                        .filter(r => ("" === filter || r.purl.toLowerCase().includes(filter)))
                        .map((row) => (
                            <ComponentTableRow key={row.id} component={row}/>
                        ))
                    }
                </TableBody>
            </Table>
        </ContentTile>
    );
}
