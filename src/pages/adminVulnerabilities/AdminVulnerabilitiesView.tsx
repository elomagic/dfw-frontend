import {useTranslation} from "react-i18next";
import {ContentTile} from "../../components/ContentTile.tsx";

export default function AdminVulnerabilitiesView() {

    const { t } = useTranslation();

    return (
        <ContentTile>
            {t("AdminVulnerabilitiesView")}
        </ContentTile>
    );
}
