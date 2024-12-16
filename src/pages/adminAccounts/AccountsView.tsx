import UserAccountTab from "./user/UserAccountTab.tsx";
import UserAccountGroupTab from "./usergroups/UserAccountGroupTab.tsx";
import {useTranslation} from "react-i18next";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../../components/ui/tabs.tsx";
import {ContentTile} from "../../components/ContentTile.tsx";

export default function AccountsView() {

    const { t } = useTranslation();

    return (
        <ContentTile>
            <Tabs defaultValue="userAccount" className="w-[400px]" style={{ margin: 3 }}>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="userAccount">{t("user-accounts")}</TabsTrigger>
                    <TabsTrigger value="userAcccountGroup">{t("user-groups")}</TabsTrigger>
                </TabsList>

                <TabsContent value="userAccount">
                    <UserAccountTab/>
                </TabsContent>
                <TabsContent value="userAcccountGroup">
                    <UserAccountGroupTab/>
                </TabsContent>
            </Tabs>
        </ContentTile>
    );
}
