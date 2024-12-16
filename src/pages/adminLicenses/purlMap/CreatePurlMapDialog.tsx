import {useTranslation} from "react-i18next";
import * as Rest from "../../../RestClient.ts"
import {RestEndpoint} from "../../../RestClient.ts"
import {useAuth} from "../../../auth/useAuth.ts";
import {useEffect, useState} from "react";
import {License, LicensePurlMap} from "../../../DTOs.ts";
import {FormSelect, KeyLabelItem} from "../../../components/FormSelect.tsx";
import FormTextField from "../../../components/FormTextField.tsx";
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

interface CreatePurlMapProps {
    open: boolean;
    handleClose: (dto: LicensePurlMap|undefined) => void;
}

export default function CreatePurlMapDialog({ open, handleClose }: Readonly<CreatePurlMapProps>) {

    const { t } = useTranslation();
    const auth = useAuth();
    const [purlMatch, setPurlMatch] = useState("");
    const [spdxId, setSpdxId] = useState("");
    const [spdxList, setSpdxList] = useState<KeyLabelItem[]>([]);

    const handleCreateClick = () => {
        const data: LicensePurlMap = {
            purlMatch,
            spdxId
        }

        Rest
            .post(auth, RestEndpoint.LicensePurlMap, data)
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
                    <DialogTitle>{t("create-purl-mapping")}</DialogTitle>
                    <DialogDescription>{t("please-enter-mapping-details")}</DialogDescription>
                </DialogHeader>

                <FormTextField id="purlMatch"
                               value={purlMatch}
                               onChange={e => setPurlMatch(e.target.value)}
                               label={t("purl-match")}
                               autoFocus
                               required
                               gridSize={6}
                />
                <FormSelect id="spdxId"
                            value={spdxId}
                            label={t("spdx-id")}
                            items={spdxList}
                            onChange={(e) => setSpdxId(e)}
                            gridSize={6}
                />

                <DialogFooter>
                    <Button variant="outline" onClick={() => handleClose(undefined)}>{t("cancel")}</Button>
                    <Button onClick={handleCreateClick}>
                        {t("create")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}