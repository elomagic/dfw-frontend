import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid2";
import {validateRequiredText} from "../../../Validators.ts";
import * as Rest from "../../../RestClient.ts";
import {useAuth} from "../../../auth/useAuth.ts";
import {UserAccount, UserAccountGroup} from "../../../DTOs.ts";
import FormSelectList from "../../../components/FormSelectList.tsx";
import FormButtons from "../../../components/FormButtons.tsx";
import FormTextField from "../../../components/FormTextField.tsx";
import {Role} from "../../../auth/Auth.tsx";
import {toaster} from "../../../Toaster.ts";

interface EditableTableRowProps {
    group: UserAccountGroup
    onSaveClick: (data: UserAccountGroup) => void;
    onDeleteRequest: () => void
}

interface StringWrapperItem {
    value: string;
}

export default function EditableTableRow({ group, onSaveClick, onDeleteRequest }: Readonly<EditableTableRowProps>) {

    const { t } = useTranslation();
    const auth = useAuth();

    const [id] = useState(group.id);
    const [name, setName] = useState(group.name);
    const [userMembers, setUserMembers] = useState<UserAccount[]>(group.userAccounts); // Key = mailAddress
    const [roles, setRoles] = useState<StringWrapperItem[]>(group.roles.map(r => ({value: r})));

    const [allUsers, setAllUsers] = useState<UserAccount[]>([]);
    const [allRoles, setAllRoles] = useState<StringWrapperItem[]>([]);

    const [nameErrorMessage, setNameErrorMessage] = useState<string|undefined>(undefined);

    useEffect(() => {
        Rest.get(auth, Rest.RestEndpoint.User)
            .then((res) => res.json())
            .then((dtos: UserAccount[]) => setAllUsers(dtos))
            .catch((err: Error) => toaster("Getting users failed: " + err.message, 'error'));

        Rest.get(auth, Rest.RestEndpoint.Role)
            .then((res) => res.json())
            .then((rs: string[]) => setAllRoles(rs.sort((a, b) => a.localeCompare(b)).map(r => ({value: r}))))
            .catch((err: Error) => toaster("Getting roles failed: " + err.message, 'error'));
    }, [auth]);

    const handleUserMembersChanged = (selectedMembers: UserAccount[]) => {
        setUserMembers(selectedMembers);
    }

    const handleRolesChanged = (selectedRoles: StringWrapperItem[]) => {
        setRoles(selectedRoles);
    }

    const handleSaveClick = () => {
        if(!validateRequiredText(name, setNameErrorMessage)) {
            return;
        }

        onSaveClick({id, name, roles: roles.map(r => r.value), userAccounts: userMembers});
    };

    return (
        <Grid container spacing={2} marginTop={2} marginBottom={2}>
            <FormTextField id="name"
                                 value={name}
                                 errorMessage={nameErrorMessage}
                                 onChange={e => {
                                     setName(e.target.value);
                                     validateRequiredText(e.target.value, setNameErrorMessage);
                                 }}
                                 label={t("name")}
                                 autoFocus
                                 required
                                 gridSize={6}
            />

            <Grid size={6} />

            <FormSelectList<UserAccount>
                value={userMembers}
                selectables={allUsers}
                label={t("user-account-members")}
                editRole={Role.USERACCOUNT_GROUP_UPDATE}
                onChange={handleUserMembersChanged}
                getItemId={(item) => item.mailAddress}
                getItemLabel={(item) => item.mailAddress}
                gridSize={6}
            />
            <FormSelectList<StringWrapperItem>
                value={roles}
                selectables={allRoles}
                label={t("roles")}
                editRole={Role.USERACCOUNT_GROUP_UPDATE}
                onChange={handleRolesChanged}
                getItemId={(item) => item.value}
                getItemLabel={(item) => item.value}
                gridSize={6}
            />

            <FormButtons roleLeftButton={Role.USERACCOUNT_GROUP_UPDATE}
                         roleRightButton={Role.USERACCOUNT_GROUP_DELETE}
                         onSaveClick={handleSaveClick}
                         onDeleteClick={onDeleteRequest}
            />
        </Grid>
    );
}
