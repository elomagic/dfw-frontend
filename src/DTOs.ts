declare type RepositoryTypes = "MAVEN" | "NPM" | "DOCKER" | "NUGET"

export interface Repository {
    id?: string;
    type: RepositoryTypes;
    name: string;
    description?: string;
    baseUri?: string;
    credentialsId?: string;
    created?: string;
    lastUpdate?: string;
}

export interface UserAccount {
    id?: string;
    username: string;
    enabled: boolean;
    changePassword: boolean;
    lastPasswordChange?: string;
    mailAddress: string;
}

export interface UserAccountGroup {
    name: string;
    userAccounts: UserAccount[];
    permissions: string[];
}

export interface Version {
    version: string;
    timestamp: string;
}

export interface License {
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

export interface LicensePackage {
    type: RepositoryTypes;
    purl: string;
    groupId: string;
    licenseId: string;
}

export interface LicensePermitted {
    spdxId: string;
}

export interface LicensePurlMap {
    purlMatch: string;
    spdxId: string;
}

export interface LicenseViolation {
    purl: string;
    licenses: string[];
}
