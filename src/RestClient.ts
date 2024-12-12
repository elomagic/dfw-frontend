import {AuthContextProps} from "./auth/Auth.tsx";
import i18next from "i18next";

const BASE_REST_URL: string = import.meta.env.DEV ? import.meta.env.VITE_BASE_URL : `${window.location.protocol}//${window.location.host}`;

export enum RestEndpoint {

    Component = "/api/v1/component",
    Configuration = "/api/v1/configuration",
    ConfigurationKey = "/api/v1/configurationKey",
    Credential = "/api/v1/credential",
    License = "/api/v1/license/spdx",
    LicenseNameMap = "/api/v1/license/nameMap",
    LicensePermitted = "/api/v1/license/permitted",
    LicensePurlMap = "/api/v1/license/purlMap",
    LicenseViolation = "/api/v1/license/violation",
    Repository = "/api/v1/repository",
    Role = "/api/v1/role",
    User = "/api/v1/user",
    UserChangePassword = "/api/v1/user/changePassword",
    UserResetPassword = "/api/v1/user/resetPassword",
    UserResetPasswordRequest = "/api/v1/user/resetPasswordRequest",
    UserRoles = "/api/v1/user/roles",
    UserSelf = "/api/v1/user/self",
    UserGroup = "/api/v1/usergroup",
    Version = "/api/v1/version",

}

function createUrl(endpoint: RestEndpoint, pathComponents: string[] | undefined, queryParameters?: Map<string, number>): RequestInfo {

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

const applyBearerToken = (auth: AuthContextProps | undefined, headers: HeadersInit | undefined): HeadersInit => {
    if (headers === undefined) {
        return auth?.isAuthenticated ? {'Authorization':`Bearer ${auth?.accessToken}`} : new Headers();
    }

    if (headers instanceof Headers) {
        if (auth?.isAuthenticated) {
            headers.set('Authorization', `Bearer ${auth?.accessToken}`);
        }
        return headers;
    }

    const h: Headers = new Headers();
    if (auth?.isAuthenticated) {
        h.set('Authorization', `Bearer ${auth?.accessToken}`);
    }

    Reflect.ownKeys(headers)
        .map(k => [k, Reflect.get(headers, k)])
        .forEach((t: string[]) => h.set(t[0], t[1]))

    return h;
}

const executeRequest = (auth: AuthContextProps, url: RequestInfo, requestOptions: RequestInit): Promise<Response> => {

    try {
        requestOptions.headers = applyBearerToken(auth, requestOptions?.headers);
    } catch (err) {
        return Promise.reject(err)
    }

    return fetch(url, requestOptions)
        .then((res: Response) => {
            if (res.status === 401) {
                auth.removeUser()
                    .finally(() => console.log("Wat nun?"));
            } else if (res.status >= 400) {
                let text = res.statusText;
                if (text === "") {
                    if (res.status === 403) {
                        text = i18next.t("forbidden");
                    } else if (res.status === 404) {
                        text = i18next.t("not-found");
                    } else if (res.status === 429) {
                        text = i18next.t("too-many-requests");
                    } else {
                        text = i18next.t("http-error-code", { status: res.status });
                    }
                 }

                return Promise.reject(new Error(text));
            }
            return Promise.resolve(res);
        });
}

export declare type PathComponents = string[] | string | undefined

export const get = (auth: AuthContextProps, endpoint: RestEndpoint, pathComponents?: PathComponents, queryParameters?: Map<string, number>): Promise<Response> => {
    let paths = undefined;
    if (pathComponents != null && Array.isArray(pathComponents)) {
        paths = pathComponents
    } else if (pathComponents != null) {
        paths = [pathComponents];
    }

    const url: RequestInfo = createUrl(endpoint, paths, queryParameters);

    const requestOptions: RequestInit = {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Accept': 'application/json, application/vnd.elomagic.dfw+json',
            'Accept-Language': `${auth.language ?? "en"}, *;q=0.5`
        },
    };

    return executeRequest(auth, url, requestOptions);
}

/**
 * Usually used for creating a resource.
 *
 * @param auth
 * @param endpoint
 * @param dto
 */
export const post = (auth: AuthContextProps, endpoint: RestEndpoint, dto: object): Promise<Response> => {

    const url: RequestInfo = createUrl(endpoint, undefined);
    const data = JSON.stringify(dto);

    const requestOptions: RequestInit = {
        body: data,
        mode: 'cors',
        method: 'POST',
        headers: {
            'Accept': 'application/json, application/vnd.elomagic.dfw+json',
            'Content-Type': 'application/json',
            'Accept-Language': `${auth.language ?? "en"}, *;q=0.5`
        },
    };

    return executeRequest(auth, url, requestOptions);
}

export const put = (auth: AuthContextProps, endpoint: RestEndpoint, dto: object): Promise<Response> => {

    const url: RequestInfo = createUrl(endpoint, undefined);
    const data = JSON.stringify(dto);

    const requestOptions: RequestInit = {
        body: data,
        mode: 'cors',
        method: 'PUT',
        headers: {
            'Accept': 'application/json, application/vnd.elomagic.dfw+json',
            'Content-Type': 'application/json',
            'Accept-Language': `${auth.language ?? "en"}, *;q=0.5`
        },
    };

    return executeRequest(auth, url, requestOptions);
}

/**
 * Usually used for updating a resource.
 *
 * @param auth
 * @param endpoint
 * @param dto
 */
export const patch = (auth: AuthContextProps, endpoint: RestEndpoint, dto: object): Promise<Response> => {

    const url: RequestInfo = createUrl(endpoint, undefined);
    const data = JSON.stringify(dto);

    const requestOptions: RequestInit = {
        body: data,
        mode: 'cors',
        method: 'PATCH',
        headers: {
            'Accept': 'application/json, application/vnd.elomagic.dfw+json',
            'Content-Type': 'application/json',
            'Accept-Language': `${auth.language ?? "en"}, *;q=0.5`
        },
    };

    return executeRequest(auth, url, requestOptions);
}


export const postFormData = (auth: AuthContextProps, endpoint: RestEndpoint, data: FormData): Promise<Response> => {

    const url: RequestInfo = createUrl(endpoint, undefined);

    const requestOptions: RequestInit = {
        body: data,
        mode: 'cors',
        method: 'POST',
        headers: {
            'Accept': 'application/json, application/vnd.elomagic.dfw+json',
            // Content-Type will be set during FormData
            'Accept-Language': `${auth.language ?? "en"}, *;q=0.5`
        },
    };

    return executeRequest(auth, url, requestOptions);
}

export const deleteResource = (auth: AuthContextProps, endpoint: RestEndpoint, uid: string|undefined, queryParameters?: Map<string, number>): Promise<Response> => {
    const path = uid === undefined ? undefined : [uid];
    const url: RequestInfo = createUrl(endpoint, path, queryParameters);

    const requestOptions: RequestInit = {
        mode: 'cors',
        method: 'DELETE',
        headers: {
            'Accept': 'application/json, application/vnd.elomagic.dfw+json',
            'Accept-Language': `${auth.language ?? "en"}, *;q=0.5`
        }
    };

    return executeRequest(auth, url, requestOptions);
}