import {AiOutlineDashboard} from "react-icons/ai";
import {BiSolidComponent} from "react-icons/bi";
import {GoLaw} from "react-icons/go";
import {FaShieldVirus} from "react-icons/fa";
import {Info, Settings} from "@mui/icons-material";
import {TbDatabaseCog, TbLockCog} from "react-icons/tb";
import {MdPolicy} from "react-icons/md";
import {GrConfigure} from "react-icons/gr";
import {RiAccountCircle2Line, RiUserSettingsLine} from "react-icons/ri";
import {PiPasswordFill} from "react-icons/pi";

export const NavItemData = {
    navMain: {
        groupName: "main",
        items: [
            {
                name: "dashboard",
                title: "dashboard",
                tooltip: "dashboard",
                url: "/",
                icon: AiOutlineDashboard,
            },
            {
                name: "components",
                title: "components",
                tooltip: "components",
                url: "components",
                icon: BiSolidComponent,
            },
            {
                name: "license-issues",
                title: "license-issues",
                tooltip: "license-issues",
                url: "license-issues",
                icon: GoLaw,
            },
            {
                name: "vulnerabilities",
                title: "vulnerabilities",
                tooltip: "vulnerabilities",
                url: "vulnerabilities",
                icon: FaShieldVirus,
            },
        ]},
    navAdmin: {
        groupName: "administration",
        items: [
            {
                name: "licenses",
                title: "admin-licenses",
                tooltip: "admin-licenses",
                url: "admin-licenses",
                icon: Settings,
            },
            {
                name: "vulnerabilities",
                title: "admin-vulnerabilities",
                tooltip: "admin-vulnerabilities",
                url: "admin-vulnerabilities",
                icon: Settings,
            },
            {
                name: "repositories",
                title: "admin-repositories",
                tooltip: "admin-repositories",
                url: "admin-repositories",
                icon: TbDatabaseCog,
            },
            {
                name: "policies",
                title: "admin-policies",
                tooltip: "admin-policies",
                url: "admin-policies",
                icon: MdPolicy,
            },
            {
                name: "credentials",
                title: "admin-credentials",
                tooltip: "credentials",
                url: "admin-credentials",
                icon: TbLockCog,
            },
            {
                name: "accounts",
                title: "admin-accounts",
                tooltip: "admin-accounts",
                url: "admin-accounts",
                icon: RiUserSettingsLine,
            },
            {
                name: "configuration",
                title: "configuration",
                tooltip: "configuration",
                url: "admin-configuration",
                icon: GrConfigure,
            },
        ]
    },
    navHelp: {
        groupName: 'help',
        items: [
            {
                name: "about",
                title: "about",
                tooltip: "about",
                url: "about",
                icon: Info,
            }
        ]
    },
    navOther: {
        groupName: 'other',
        items: [
            {
                name: "my-account",
                title: "my-account",
                tooltip: "my-account",
                url: "my-account",
                icon: RiAccountCircle2Line,
            },
            {
                name: "change-password",
                title: "change-password",
                tooltip: "change-password",
                url: "change-password",
                icon: PiPasswordFill,
            },
            {
                name: "reset-password",
                title: "reset-password",
                tooltip: "reset-password",
                url: "reset-password",
                icon: PiPasswordFill,
            }
        ]
    }
}
