import {AiOutlineAudit, AiOutlineDashboard} from "react-icons/ai";
import {BiSolidComponent} from "react-icons/bi";
import {GoLaw} from "react-icons/go";
import {FaBandAid, FaShieldVirus} from "react-icons/fa";
import {Info, SvgIconComponent} from "@mui/icons-material";
import {TbLicense, TbLockCog} from "react-icons/tb";
import {MdPolicy} from "react-icons/md";
import {GrConfigure, GrNavigate} from "react-icons/gr";
import {RiAccountCircle2Line, RiUserSettingsLine} from "react-icons/ri";
import {PiPasswordFill} from "react-icons/pi";
import type {IconType} from "react-icons";

export declare type NavItem = {
    url: string,
    name: string,
    title: string,
    tooltip: string,
    icon: IconType | SvgIconComponent;
}

export declare type NavGroup = {
    groupName: string,
    items: NavItem[],
}

export declare type NavItems = {
    navMain: NavGroup,
    navAdmin: NavGroup,
    navHelp: NavGroup,
    navOther: NavGroup,
}

export const NavItemData: NavItems = {
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
                name: "policy-violations",
                title: "policy-violations",
                tooltip: "policy-violations",
                url: "policy-violations",
                icon: GoLaw,
            },
            {
                name: "proxy-audits",
                title: "proxy-audits",
                tooltip: "proxy-audits",
                url: "proxy-audits",
                icon: AiOutlineAudit,
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
                name: "proxies",
                title: "admin-proxies",
                tooltip: "admin-proxies",
                url: "admin-proxies",
                icon: GrNavigate,
            },
            {
                name: "policies",
                title: "admin-policies",
                tooltip: "admin-policies",
                url: "admin-policies",
                icon: MdPolicy,
            },
            {
                name: "license-groups",
                title: "admin-license-groups",
                tooltip: "admin-license-groups",
                url: "admin-license-groups",
                icon: TbLicense,
            },
            {
                name: "patches",
                title: "admin-patches",
                tooltip: "admin-patches",
                url: "admin-patches",
                icon: FaBandAid,
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
