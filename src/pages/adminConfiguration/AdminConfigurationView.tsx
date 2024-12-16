import {useCallback, useEffect, useState} from "react";
import * as Rest from "../../RestClient.ts"
import {Configuration, ConfigurationKeyMeta} from "../../DTOs.ts";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../auth/useAuth.ts";
import TableHeaderControls from "../../components/TableHeaderControls.tsx";
import CollapsableTableRow from "./CollapsableTableRow.tsx";
import YesNoDialog from "../../components/YesNoDialog.tsx";
import { toaster } from "../../Toaster.ts";
import {Table, TableBody, TableCell, TableHead, TableRow} from "../../components/ui/table.tsx";
import {ContentTile} from "../../components/ContentTile.tsx";

export default function AdminConfigurationView() {

    const { t } = useTranslation();
    const auth = useAuth();
    const [ rows, setRows ] = useState<Configuration[]>([]);
    const [ filter, setFilter ] = useState<string>("");
    const [ deleteOpen, setDeleteOpen ] = useState<boolean>(false);
    const [ selectedEntity, setSelectedEntity ] = useState<Configuration>();

    const [ configurationKeyMetas, setConfigurationKeyMetas ] = useState<ConfigurationKeyMeta[]>([]);

    const refresh = useCallback(() => {
        Rest.get(auth, Rest.RestEndpoint.Configuration)
            .then((res) => res.json())
            .then((entities: Configuration[]) => {
                return entities.sort((a, b) => a.key.localeCompare(b.key));
            })
            .then((entities: Configuration[]) => {
                setRows(entities);
            })
            .catch((err: Error) => {
                setRows([])
                toaster(t("getting-data-failed",  { message: err.message }), 'error');
            });
    }, [t, auth]);

    const handleResetRequest = (r: Configuration) => {
        setSelectedEntity(r);
        setDeleteOpen(true);
    }

    const handleDelete = () => {
        Rest.deleteResource(auth, Rest.RestEndpoint.Configuration, selectedEntity?.key)
            .then(() => refresh())
            .catch((err: Error) => toaster(t("reset-failed", { message: err.message }), 'error'))
            .finally(() => setDeleteOpen(false))
    }

    useEffect(() => {
        refresh();
    }, [refresh]);

    useEffect(() => {
        Rest.get(auth, Rest.RestEndpoint.ConfigurationKey)
            .then((res) => res.json())
            .then((rs: ConfigurationKeyMeta[]) => setConfigurationKeyMetas(rs))
            .catch((err: Error) => toaster(t("getting-data-failed",  { message: err.message }), 'error'));
    }, [auth, t]);

    return (
        <ContentTile>
            <TableHeaderControls onFilterChanged={f => setFilter(f)} onRefresh={refresh}/>

            <Table style={{ minWidth: 900 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell width={"500px"}>{t("property")}</TableCell>
                        <TableCell>{t("value")}</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows
                        .filter(dto => ("" === filter || dto.key.toLowerCase().includes(filter)))
                        .map((row) => (
                            <CollapsableTableRow key={row.key}
                                                 configuration={row}
                                                 keyMeta={configurationKeyMetas.find(m => m.key == row.key)}
                                                 onResetRequest={(c) => handleResetRequest(c)}
                            />
                        ))
                    }
                </TableBody>
            </Table>

            <YesNoDialog title={t("pages.admin-configuration.dialog.reset.title")}
                         text={t("pages.admin-configuration.dialog.reset.text", {key: selectedEntity?.key})}
                         open={deleteOpen}
                         onYesClick={() => handleDelete()}
                         onNoClick={() => setDeleteOpen(false)}
            />
        </ContentTile>
    );
}
