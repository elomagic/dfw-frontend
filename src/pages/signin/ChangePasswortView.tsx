import {useTranslation} from "react-i18next";

export default function ChangePasswortView() {

    const { t } = useTranslation();

    return (
        <div style={{ margin: 3}}>
            {t("changepassword")}
        </div>
    );
}
