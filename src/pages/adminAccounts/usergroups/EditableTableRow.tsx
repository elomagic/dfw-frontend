import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {Button} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {FormFieldProperty, validateInputs} from "../../../FormFieldProperties.ts";
import FormFieldComponents, {KeyLabelItem} from "../../../components/FormFieldComponents.tsx";
import * as Rest from "../../../RestClient.ts";
import {RestEndpoint} from "../../../RestClient.ts";
import {useAuth} from "../../../auth/useAuth.ts";
import {UserAccount, UserAccountGroup} from "../../../DTOs.ts";
import {enqueueSnackbar} from "notistack";
import FormSelectList from "../../../components/FormSelectList.tsx";

const fields: FormFieldProperty[] = [
    { name : "name", minLength: 1 },
];

interface EditableTableRowProps {
    group: UserAccountGroup
}

export default function EditableTableRow({ group }: Readonly<EditableTableRowProps>) {

    const { t } = useTranslation();
    const auth = useAuth();

    const [id] = useState(group.id);
    const [name, setName] = useState(group.name);
    const [userMembers, setUserMembers] = useState<string[]>([]); // Key = mailAddress
    const [allUsers, setAllUsers] = useState<KeyLabelItem[]>([]);

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
            .catch((err) => enqueueSnackbar("Getting users failed: " + err, { variant: 'error'} ));
    }, [auth]);

    const handleUserMembers = (selectedMembers: string[]) => {
        setUserMembers(selectedMembers);
    }

    const handleSaveClick = () => {
        if (validateInputs(fields, (fieldName, result) => {
            switch (fieldName) {
                case "name": {
                    setNameErrorMessage(result);
                    break;
                }
            }
        })) {
            return;
        }

        const data: UserAccountGroup = {
            id,
            name,
            permissions: [],
            userAccounts: []
        }

        Rest.patch(auth, RestEndpoint.UserGroup, data)
            .then(() => enqueueSnackbar("Successful saved", { variant: 'success'} ))
            .catch((err) => enqueueSnackbar("Saving data failed: " + err, { variant: 'error'} ));
    };

    return (
        <Grid container spacing={2} margin={2} onSubmit={handleSaveClick}>
            <FormFieldComponents id="name"
                                 value={name}
                                 errorMessage={nameErrorMessage}
                                 onChange={e => setName(e.target.value)}
                                 label={t("name")}
                                 autoFocus
                                 required
                                 gridSize={6}
            />

            <FormSelectList value={userMembers}
                            selectables={allUsers}
                            label={t("User Account Members")}
                            onChange={handleUserMembers} />

            <Grid size={12}>
                <Button
                    variant="contained"
                    onClick={handleSaveClick}
                >
                    {t("save")}
                </Button>
            </Grid>
        </Grid>
    );
}
