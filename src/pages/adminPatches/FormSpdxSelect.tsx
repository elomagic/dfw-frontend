"use client"

import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import * as Rest from "@/RestClient.ts";
import {toaster} from "@/Toaster.ts";
import {useAuth} from "@/auth/useAuth.ts";
import {FormSelect, KeyLabelItem} from "@components/FormSelect.tsx";
import {License} from "@/DTOs.ts";
import {GridSize} from "@mui/material/Grid2/Grid2";

interface ComponentProps {
    value: string;
    gridSize?: GridSize;
    onChange: (value: string) => void;
}

export const FormSpdxSelect = (props: Readonly<ComponentProps>) => {

    const auth = useAuth();

    const { t } = useTranslation();
    const [spdxList, setSpdxList] = useState<KeyLabelItem[]>([]);

    useEffect(() => {
        Rest.get<License[]>(auth, Rest.Endpoint.License)
            .then((rs: License[]) => rs.map(l => { return { "key": l.licenseId, "label": l.name} as KeyLabelItem })) // setSpdxList(rs))
            .then((kl: KeyLabelItem[]) => setSpdxList(kl))
            .catch((err: Error) => toaster("Getting spdx list failed: " + err.message, 'error'));
    }, [auth]);

    return (
        <FormSelect id="spdxId"
                    value={props.value}
                    label={t("spdx-id")}
                    items={spdxList}
                    onChange={props.onChange}
                    gridSize={props.gridSize}
        />
    );
}