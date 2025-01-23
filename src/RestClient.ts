import {AuthContextProps} from "./auth/Auth.tsx";
import i18next from "i18next";
import {ErrorResponse} from "./DTOs.ts";
import * as axios from "axios";
import {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";

const BASE_REST_URL: string = import.meta.env.DEV ? import.meta.env.VITE_BASE_URL : `${window.location.protocol}//${window.location.host}`;

export enum Endpoint {

    Component = "/api/v1/component",
    Configuration = "/api/v1/configuration",
    ConfigurationKey = "/api/v1/configurationKey",
    Credential = "/api/v1/credential",
    License = "/api/v1/license/spdx",
    LicenseGroup = "/api/v1/license/group",
    LicenseNameMap = "/api/v1/license/nameMap",
    LicensePurlMap = "/api/v1/license/purlMap",
    Policy = "/api/v1/policy",
    PolicyViolation = "/api/v1/policyViolation",
    Proxy = "/api/v1/proxy",
    ProxyAudit = "/api/v1/proxyAudit",
    Role = "/api/v1/role",
    User = "/api/v1/user",
    // UserChangePassword = "/api/v1/user/changePassword",
    UserResetPassword = "/api/v1/user/resetPassword",
    UserResetPasswordRequest = "/api/v1/user/resetPasswordRequest",
    UserSelf = "/api/v1/user/self",
    UserGroup = "/api/v1/usergroup",
    Version = "/api/v1/version",

}

const MIMETYPE_APPLICATION_JSON = 'application/json';

const toJson = (dto: object): string => {
    return JSON.stringify(dto, (key, value) => {
        return key === "_itemId" ? null : value;
    });
}

const createUrl = (endpoint: Endpoint, pathComponents: string[] | undefined, queryParameters?: Map<string, number>): string => {

    let url: string = BASE_REST_URL + endpoint;

    if (pathComponents) {
        pathComponents.forEach(function (path){
            url += `/${path}`
        })
    }

    if (queryParameters && queryParameters.size !== 0) {
        url += "?"
        const argumentString = Array
            .from(queryParameters.entries())
            .map(e => `${e[0]}=${e[1]}`)
            .join("&")

        url += argumentString
    }

    return url;

}

const applyHeader = (name: string, value: string, requestOptions: AxiosRequestConfig): AxiosRequestConfig => {
    if (requestOptions.headers === undefined) {
        requestOptions.headers = {};
    }

    requestOptions.headers[name] = value;

    return requestOptions;
}

const applyBearerToken = (auth: AuthContextProps | undefined, requestOptions: AxiosRequestConfig): AxiosRequestConfig => {
    return applyHeader("Authorization", `Bearer ${auth?.accessToken}`, requestOptions);
}

const executeRequest = <T> (auth: AuthContextProps, requestOptions: AxiosRequestConfig): Promise<T> => {

    requestOptions = applyBearerToken(auth, requestOptions);
    requestOptions = applyHeader('Accept', 'application/json, application/vnd.elomagic.dfw+json', requestOptions);
    requestOptions = applyHeader('Accept-Language', `${auth.language ?? "en"}, *;q=0.5`, requestOptions);

    return axios.default.request(requestOptions)
        .then((res: AxiosResponse) => {
            return res.data;
        })
        .catch((error: AxiosError) => {
            if (error.status === 401) {
                auth.removeUser()
                    .finally(() => console.log("Error: 401, Wat nun?"));
            } else {
                const contentType = error.response?.headers['content-type'];
                let text = error.message;
                if (contentType == "application/vnd.elomagic.dfw+json;charset=UTF-8") {
                    const errorResponse: ErrorResponse = error.response?.data as ErrorResponse ?? { message: '', statusCode: '' };
                    return Promise.reject(new Error(errorResponse.message));
                }

                if (text === "" || text == undefined) {
                    if (error.status === 403) {
                        text = i18next.t("forbidden");
                    } else if (error.status === 404) {
                        text = i18next.t("not-found");
                    } else if (error.status === 429) {
                        text = i18next.t("too-many-requests");
                    } else {
                        text = i18next.t("http-error-code", { status: error.status });
                    }
                }

                return Promise.reject(new Error(text));
            }
        })
}

export declare type PathComponents = string[] | string | undefined

/**
 * Request DTOs
 *
 * @param auth
 * @param endpoint
 * @param pathComponents
 * @param queryParameters
 */
export const get = <T> (auth: AuthContextProps, endpoint: Endpoint, pathComponents?: PathComponents, queryParameters?: Map<string, number>): Promise<T> => {
    let paths = undefined;
    if (pathComponents != null && Array.isArray(pathComponents)) {
        paths = pathComponents
    } else if (pathComponents != null) {
        paths = [pathComponents];
    }

    const url: string = createUrl(endpoint, paths, queryParameters);

    const requestOptions: AxiosRequestConfig = {
        url,
        method: 'GET'
    };

    return executeRequest(auth, requestOptions);
}

/**
 * Usually used for creating a resource.
 *
 * @param auth
 * @param endpoint
 * @param dto
 */
export const post = (auth: AuthContextProps, endpoint: Endpoint, dto: object): Promise<AxiosResponse> => {

    const url: RequestInfo = createUrl(endpoint, undefined);
    const data = toJson(dto);

    const requestOptions: AxiosRequestConfig = {
        url,
        data,
        method: 'POST',
        headers: {
            'Content-Type': MIMETYPE_APPLICATION_JSON,
        },
    };

    return executeRequest(auth, requestOptions);
}

/**
 * Usually used for updating a resource.
 *
 * @param auth
 * @param endpoint
 * @param dto
 */
export const patch = <T> (auth: AuthContextProps, endpoint: Endpoint, dto: object): Promise<T> => {

    const url: RequestInfo = createUrl(endpoint, undefined);
    const data = toJson(dto);

    const requestOptions: AxiosRequestConfig = {
        url,
        data,
        method: 'PATCH',
        headers: {
            'Content-Type': MIMETYPE_APPLICATION_JSON,
        },
    };

    return executeRequest(auth, requestOptions);
}


export const postForm = (auth: AuthContextProps, endpoint: Endpoint, data: FormData): Promise<AxiosResponse> => {

    const url: RequestInfo = createUrl(endpoint, undefined);

    const requestOptions: AxiosRequestConfig = {
        url,
        data,
        method: 'POST'
        // Headers: Content-Type will be set during FormData
    };

    return executeRequest(auth, requestOptions);
}

export const deleteResource = (auth: AuthContextProps, endpoint: Endpoint, uid: string|undefined, queryParameters?: Map<string, number>): Promise<AxiosResponse> => {
    const path = uid === undefined ? undefined : [uid];
    const url: RequestInfo = createUrl(endpoint, path, queryParameters);

    const requestOptions: AxiosRequestConfig = {
        url,
        method: 'DELETE'
    };

    return executeRequest(auth, requestOptions);
}