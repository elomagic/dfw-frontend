export declare type RepositoryTypes = "MAVEN" | "NPM" | "DOCKER" | "NUGET"
export declare type AuthenticationMode = "BASIC" | "BEARER"

// Name of the dto must differ from "Credential"
export declare interface CredentialData {
    id?: string;
    credentialId: string;
    mode: AuthenticationMode;
    username: string;
    password: string;
    passphrase: string;
}

export declare interface Repository {
    id?: string;
    type: RepositoryTypes;
    enabled: boolean;
    name: string;
    description?: string;
    baseUri?: string;
    credentialId?: string;
    created?: string;
    lastUpdate?: string;
}

export declare interface UserAccount {
    id?: string;
    mailAddress: string;
    displayName: string;
    enabled: boolean;
    changePassword: boolean;
    lastPasswordChange?: string;
}

export declare interface UserAccountGroup {
    id?: string;
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
