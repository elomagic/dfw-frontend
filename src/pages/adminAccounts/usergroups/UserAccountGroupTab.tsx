import {useTranslation} from "react-i18next";
import {useAuth} from "../../../auth/useAuth.ts";
import {useCallback, useEffect, useState} from "react";
import {UserAccountGroup} from "../../../DTOs.ts";
import * as Rest from "../../../RestClient.ts";
import TableHeaderControls from "../../../components/TableHeaderControls.tsx";
import CollapsableUserGroupTableRow from "./CollapsableUserGroupTableRow.tsx";
import CreateUserGroupDialog from "./CreateUserGroupDialog.tsx";
import YesNoDialog from "../../../components/YesNoDialog.tsx";
import {Role} from "../../../auth/Auth.tsx";
import {toaster} from "../../../Toaster.ts";
import {Table, TableBody, TableCell, TableHead, TableRow} from "../../../components/ui/table.tsx";

export default function UserAccountGroupTab() {

    const { t } = useTranslation();
    const auth = useAuth();
    const [ rows, setRows ] = useState<UserAccountGroup[]>([]);
    const [ filter, setFilter ] = useState<string>("");
    const [ dialogOpen, setDialogOpen ] = useState<boolean>(false);
    const [ deleteOpen, setDeleteOpen ] = useState<boolean>(false);
    const [ selectedEntity, setSelectedEntity ] = useState<UserAccountGroup>();

    const refresh = useCallback(() => {
        Rest.get(auth, Rest.RestEndpoint.UserGroup)
            .then((res) => res.json())
            .then((dtos: UserAccountGroup[]) => {
                setRows(dtos);
            })
            .catch((err: Error) => {
                setRows([])
                toaster(t("getting-data-failed",  { message: err.message }), 'error');
            });
    }, [t, auth]);

    const handleCloseDialog = (dto: UserAccountGroup|undefined) => {
        setDialogOpen(false);
        refresh();

        if (dto) {
            setFilter(dto.name);
        }
    }

    const handleDeleteRequest = (ug: UserAccountGroup) => {
        setSelectedEntity(ug);
        setDeleteOpen(true);
    }

    const handleDelete = () => {
        Rest.deleteResource(auth, Rest.RestEndpoint.UserGroup, selectedEntity?.id)
            .then(() => refresh())
            .catch((err: Error) => toaster(t("deleting-failed", { message: err.message }), 'error'))
            .finally(() => setDeleteOpen(false))
    }

    useEffect(() => {
        refresh();
    }, [refresh]);

    return (
        <>
            <TableHeaderControls createCaption={t("create-user-group")}
                                 onCreateClicked={() => setDialogOpen(true)}
                                 onFilterChanged={f => setFilter(f)}
                                 onRefresh={refresh}
                                 role={Role.USERACCOUNT_GROUP_CREATE}
            />

            <Table style={{ minWidth: 900 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>{t("name")}</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows
                        .filter(r => ("" === filter || r.name.toLowerCase().includes(filter)))
                        .map((row) => (
                            <CollapsableUserGroupTableRow key={row.name}
                                                          userGroup={row}
                                                          onDeleteRequest={(id) => handleDeleteRequest(id)}
                            />
                        ))
                    }
                </TableBody>
            </Table>

            <CreateUserGroupDialog open={dialogOpen} handleClose={(dto) => handleCloseDialog(dto)} />
            <YesNoDialog title={t("delete-user-group")}
                         text={`Do ya really want to delete the user group '${selectedEntity?.name}'?`}
                         open={deleteOpen}
                         onYesClick={() => handleDelete()}
                         onNoClick={() => setDeleteOpen(false)}
            />
        </>
    );
}