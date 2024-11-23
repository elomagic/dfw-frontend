import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid2";
import {validateRequiredText} from "../../../Validators.ts";
import {KeyLabelItem} from "../../../components/FormSelect.tsx";
import * as Rest from "../../../RestClient.ts";
import {useAuth} from "../../../auth/useAuth.ts";
import {UserAccount, UserAccountGroup} from "../../../DTOs.ts";
import {enqueueSnackbar} from "notistack";
import FormSelectList from "../../../components/FormSelectList.tsx";
import FormButtons from "../../../components/FormButtons.tsx";
import FormTextField from "../../../components/FormTextField.tsx";

interface EditableTableRowProps {
    group: UserAccountGroup
    onSaveClick: (data: UserAccountGroup) => void;
    onDeleteRequest: () => void
}

export default function EditableTableRow({ group, onSaveClick, onDeleteRequest }: Readonly<EditableTableRowProps>) {

    const { t } = useTranslation();
    const auth = useAuth();

    const [id] = useState(group.id);
    const [name, setName] = useState(group.name);
    const [userMembers, setUserMembers] = useState<string[]>(group.userAccountMailAddresses); // Key = mailAddress
    const [roles, setRoles] = useState<string[]>(group.roles);

    const [allUsers, setAllUsers] = useState<KeyLabelItem[]>([]);
    const [allRoles, setAllRoles] = useState<string[]>([]);

    const [nameErrorMessage, setNameErrorMessage] = useState<string|undefined>(undefined);

    useEffect(() => {
        Rest.get(auth, Rest.RestEndpoint.User)
            .then((res) => res.json())
            .then((dtos: UserAccount[]) => {
                return dtos.map(u => { return { "key": u.mailAddress, "label": u.mailAddress} as KeyLabelItem })
            })
            .then((items: KeyLabelItem[]) => {
                setAllUsers(items);
            })
            .catch((err: Error) => enqueueSnackbar("Getting users failed: " + err.message, { variant: 'error' } ));

        Rest.get(auth, Rest.RestEndpoint.Role)
            .then((res) => res.json())
            .then((rs: string[]) => setAllRoles(rs))
            .catch((err: Error) => enqueueSnackbar("Getting roles failed: " + err.message, { variant: 'error' } ));
    }, [auth]);

    const handleUserMembersChanged = (selectedMembers: string[]) => {
        setUserMembers(selectedMembers);
    }

    const handleRolesChanged = (selectedRoles: string[]) => {
        setRoles(selectedRoles);
    }

    const handleSaveClick = () => {
        if(!validateRequiredText(name, setNameErrorMessage)) {
            return;
        }

        onSaveClick({id, name, roles, userAccountMailAddresses: userMembers});
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

            <FormSelectList value={userMembers}
                            selectables={allUsers}
                            label={t("user-account-members")}
                            onChange={handleUserMembersChanged}
                            gridSize={6}
            />
            <FormSelectList value={roles}
                            selectables={allRoles.map(r => { return { "key": r, "label": r} as KeyLabelItem })}
                            label={t("roles")}
                            onChange={handleRolesChanged}
                            gridSize={6}
            />

            <FormButtons onSaveClick={handleSaveClick} onDeleteClick={onDeleteRequest}/>
        </Grid>
    );
}
