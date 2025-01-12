export declare type ProxyTypes = "MAVEN" | "NPM" | "DOCKER" | "NUGET"
export declare type AuthenticationMode = "BASIC" | "BEARER"
export declare type ViolationState = "FAIL" | "WARN" | "INFO";
export declare type ConditionType = "AGE" | "LICENSE_GROUP" | "SEVERTITY";
export declare type ConditionOperator = "GREATER_THAN" | "IN" | "IS" | "IS_NOT" | "NOT_IN" | "SMALLER_THAN";

// For internal managing, create my own item ID
export declare type ItemId<T> = T & {
    _itemId: string;
};

export declare interface CreateUpdated {
    created?: string
    lastUpdated? : string;
}

export declare interface IdItem extends CreateUpdated {    // '{}' can be replaced with 'any'
    id?: string;
}

export declare interface ErrorResponse {
    statusCode: string;
    message: string;
}

export declare interface ConfigurationKeyMeta {
    key: string,
    dataType: string,
    group: string,
    subgroup: string,
    secret: boolean
}

export declare interface PolicyCondition extends IdItem {
    condition: ConditionType;
    operator: ConditionOperator;
    conditionalValue: string;
}

export declare interface Policy extends IdItem {
    name: string;
    violationState: ViolationState;
    conditions: PolicyCondition[];
    enabled: boolean;
}

export declare interface ComponentLicense extends IdItem {
    name?: string;
    url?: string;
    comment?: string;
}

export declare interface Component extends IdItem {
    type: ProxyTypes;
    purl: string;
    namespace: string;
    name: string;
    version: string;
    qualifiers: string;
    subpath: string;
    licenses: ComponentLicense[]
}

export declare interface Configuration extends CreateUpdated {
    key: string;
    value: string;
}

// Name of the dto must differ from "Credential"
export declare interface CredentialData extends IdItem {
    credentialId: string;
    mode: AuthenticationMode;
    username: string;
    password: string;
    passphrase: string;
}

export declare interface UserAccountApiKey extends IdItem {
    id?: string;
    apiKey?: string;
    comment: string;
    created?: string;
}

export declare interface UserAccount extends IdItem {
    id?: string;
    mailAddress: string;
    displayName: string;
    language: string;
    enabled: boolean;
    changePassword: boolean;
    lastPasswordChange?: string;
    apiKeys?: UserAccountApiKey[];
}

export declare interface UserAccountGroup extends IdItem {
    id?: string;
    name: string;
    userAccounts: UserAccount[];
    roles: string[];
}

export declare interface Proxy extends IdItem {
    id?: string;
    type: ProxyTypes;
    enabled: boolean;
    name: string;
    description?: string;
    baseUri?: string;
    credentialId?: string;
    created?: string;
    lastUpdate?: string;
    groupPermissions: UserAccountGroup[];
    forwardHeaders: boolean;
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

export declare interface LicenseGroup extends IdItem {
    id?: string;
    name: string;
    licenses?: License[];
}

export interface LicenseNameMap extends IdItem {
    id?: string;
    nameMatch: string;
    spdxId: string;
    comment?: string;
}

export declare interface LicensePurlMap extends IdItem {
    id?: string;
    purlMatch: string;
    spdxId: string;
    comment?: string;
}

export declare interface LicensePackage {
    type: ProxyTypes;
    purl: string;
    groupId: string;
    licenseId: string;
}

export declare interface LicensePermitted {
    spdxId: string;
}

export declare interface LicenseViolation extends IdItem {
    id: string;
    purl: string;
    licenses: string[];
}
