import {useTranslation} from "react-i18next";
import PurlMapTab from "./purlMap/PurlMapTab.tsx";
import NameMapTab from "./nameMap/NameMapTab.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../../components/ui/tabs.tsx";
import {ContentTile} from "../../components/ContentTile.tsx";

export default function AdminLicensesView() {

    const { t } = useTranslation();

    return (
        <ContentTile>
            <Tabs defaultValue="purlMap" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="purlMap">{t("purl-mappings")}</TabsTrigger>
                    <TabsTrigger value="nameMap">{t("name-mappings")}</TabsTrigger>
                </TabsList>

                <TabsContent value="purlMap">
                    <PurlMapTab/>
                </TabsContent>
                <TabsContent value="nameMap">
                    <NameMapTab/>
                </TabsContent>
            </Tabs>
        </ContentTile>
    );
}
