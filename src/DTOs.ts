export declare type RepositoryTypes = "MAVEN" | "NPM" | "DOCKER" | "NUGET"

export declare interface Repository {
    id?: string;
    type: RepositoryTypes;
    name: string;
    description?: string;
    baseUri?: string;
    credentialsId?: string;
    created?: string;
    lastUpdate?: string;
}

export declare interface UserAccount {
    id?: string;
    mailAddress: string;
    enabled: boolean;
    changePassword: boolean;
    lastPasswordChange?: string;
}

export declare interface UserAccountGroup {
    name: string;
    userAccounts: UserAccount[];
    permissions: string[];
}

export declare interface Version {
    version: string;
    timestamp: string;
}

export declare interface License {
    reference: string;
    isDeprecatedLicenseId: boolean;
    detailsUrl: string;
    referenceNumber: number;
    name: string;
    licenseId: string;
    seeAlso: string[];
    isOsiApproved: boolean;
}

export interface LicenseNameMap {
    nameMatch: string;
    spdxId: string;
}

export declare interface LicensePackage {
    type: RepositoryTypes;
    purl: string;
    groupId: string;
    licenseId: string;
}

export declare interface LicensePermitted {
    spdxId: string;
}

export declare interface LicensePurlMap {
    purlMatch: string;
    spdxId: string;
}

export declare interface LicenseViolation {
    purl: string;
    licenses: string[];
}
