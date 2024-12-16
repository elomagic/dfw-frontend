import {useTranslation} from "react-i18next";
import {ContentTile} from "../../components/ContentTile.tsx";

export default function VulnerabilitiesView() {

    const { t } = useTranslation();

    return (
        <ContentTile>
            {t("VulnerabilitiesView")}
        </ContentTile>
    );
}
