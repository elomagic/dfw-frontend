import {useTranslation} from "react-i18next";
import * as Rest from "../../../RestClient.ts"
import {RestEndpoint} from "../../../RestClient.ts"
import {useAuth} from "../../../auth/useAuth.ts";
import {useEffect, useState} from "react";
import {License, LicenseNameMap} from "../../../DTOs.ts";
import FormTextField from "../../../components/FormTextField.tsx";
import {FormSelect, KeyLabelItem} from "../../../components/FormSelect.tsx";
import {toaster} from "../../../Toaster.ts";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "../../../components/ui/dialog.tsx";
import {Button} from "../../../components/ui/button.tsx";

interface CreateNameMapProps {
    open: boolean;
    handleClose: (dto: LicenseNameMap|undefined) => void;
}

export default function CreateNameMapDialog({ open, handleClose }: Readonly<CreateNameMapProps>) {

    const { t } = useTranslation();
    const auth = useAuth();
    const [nameMatch, setNameMatch] = useState("");
    const [spdxId, setSpdxId] = useState("");
    const [spdxList, setSpdxList] = useState<KeyLabelItem[]>([]);

    const handleCreateClick = () => {
        const data: LicenseNameMap = {
            nameMatch,
            spdxId
        }

        Rest
            .post(auth, RestEndpoint.LicenseNameMap, data)
            .then(() => handleClose(data))
            .then(() => toaster(t("successful-created"), 'success'))
            .catch((err: Error) => toaster(t("creation-failed", { message: err.message }), 'error'));
    }

    useEffect(() => {
        Rest.get(auth, Rest.RestEndpoint.License)
            .then((res) => res.json())
            .then((rs: License[]) => rs.map(l => { return { "key": l.licenseId, "label": l.name} as KeyLabelItem })) // setSpdxList(rs))
            .then((kl: KeyLabelItem[]) => setSpdxList(kl))
            .catch((err: Error) => toaster("Getting spdx list failed: " + err.message, 'error'));
    }, [auth]);

    return (
        <Dialog open={open} onOpenChange={(s) => !s && handleClose(undefined)}>
            <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                <DialogHeader>
                    <DialogTitle>{t("create-name-mapping")}</DialogTitle>
                    <DialogDescription>Please enter mapping details</DialogDescription>
                </DialogHeader>

                <FormTextField id="nameMatch"
                               value={nameMatch}
                               onChange={e => setNameMatch(e.target.value)}
                               label={t("name-match")}
                               autoFocus
                               required
                               gridSize={6}
                />
                <FormSelect id="spdxId"
                            value={spdxId}
                            label={t("spdx-id")}
                            items={spdxList}
                            onChange={(e) => setSpdxId(e)}
                />

                <DialogFooter>
                    <Button variant="outline" onClick={() => handleClose(undefined)}>{t("cancel")}</Button>
                    <Button onClick={handleCreateClick}>{t("create")}</Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    );
}