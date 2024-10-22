import {AuthContextProps} from "./Auth.ts";

export const PRODUCTION: boolean = window.location.host.includes('dfw.elomagic.de');
const PUBLIC_BASE_URL: string = PRODUCTION
    ? "https://dfw.elomagic.de"
    : "https://localhost:8080";
export const REDIRECT_BASE: string = process.env.REACT_APP_REDIRECT_BASE_URI ?? PUBLIC_BASE_URL;

const BASE_REST_URL: string = PUBLIC_BASE_URL + "/rest"

export enum RestEndpoint {

    Repository = "/v1/repository",
    GameStatistics = "/v2/game/statistics",
    Image = "/v1/image",
    ImageScan = "/v2/image/scan",
    Metric = "v1/metric",
    Subscription = "/subscription",
    User = "/v1/user",
    Version = "/version",

}

function createUrl(endpoint: RestEndpoint, pathComponents: string[] | undefined, queryParameters?: Map<string, number>): string {

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

const executeRequest = (auth: AuthContextProps, input: RequestInfo, requestOptions: RequestInit): Promise<Response> => {
    try {
        requestOptions.headers = applyBearerToken(auth, requestOptions?.headers);
    } catch (err) {
        return Promise.reject(err)
    }

    return fetch(input, requestOptions)
        .then((res: Response) => {
            if (res.status === 401) {
                auth.removeUser()
                    .finally(() => console.log("Wat nun?"));
            } else if (res.status >= 400) {
                return Promise.reject(new Error(res.statusText));
            }
            return Promise.resolve(res);
        });
}

const _get = (auth: AuthContextProps, endpoint: RestEndpoint, pathComponents?: string[]|string|undefined, queryParameters?: Map<string, any>, acceptedMimeType?: string): Promise<Response> => {
    let paths = undefined;
    if (pathComponents != null && Array.isArray(pathComponents)) {
        paths = pathComponents
    } else if (pathComponents != null) {
        paths = [pathComponents];
    }

    const url: string = createUrl(endpoint, paths, queryParameters);

    const requestOptions: RequestInit = {
        mode: 'cors',
        method: 'GET',
        headers: {
            "Accept": acceptedMimeType ?? "*/*",
        },
    };

    return executeRequest(auth, url, requestOptions);
}

export const getImage = (auth: AuthContextProps, endpoint: RestEndpoint, pathComponents?: string[]|string|undefined, queryParameters?: Map<string, number>): Promise<Response> => {
    return _get(auth, endpoint, pathComponents, queryParameters, "image/*");
}

export const get = (auth: AuthContextProps, endpoint: RestEndpoint, pathComponents?: string[]|string|undefined, queryParameters?: Map<string, number>): Promise<Response> => {
    return _get(auth, endpoint, pathComponents, queryParameters, "application/json")
}

/**
 * Usually used for creating a resource.
 *
 * @param auth
 * @param endpoint
 * @param dto
 */
export const post = (auth: AuthContextProps, endpoint: RestEndpoint, dto: object): Promise<Response> => {

    const url: string = createUrl(endpoint, undefined);
    const data = JSON.stringify(dto);

    const requestOptions: RequestInit = {
        body: data,
        mode: 'cors',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
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
export const put = (auth: AuthContextProps, endpoint: RestEndpoint, dto: object): Promise<Response> => {

    const url: string = createUrl(endpoint, undefined);
    const data = JSON.stringify(dto);

    const requestOptions: RequestInit = {
        body: data,
        mode: 'cors',
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    };

    return executeRequest(auth, url, requestOptions);
}


export const postFormData = (auth: AuthContextProps, endpoint: RestEndpoint, data: FormData): Promise<Response> => {

    const url: string = createUrl(endpoint, undefined);

    const requestOptions: RequestInit = {
        body: data,
        mode: 'cors',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            // Content-Type will be set during FormData
        },
    };

    return executeRequest(auth, url, requestOptions);
}

export const putFormData = (auth: AuthContextProps, endpoint: RestEndpoint, data: FormData): Promise<Response> => {

    const url: string = createUrl(endpoint, undefined);

    const requestOptions: RequestInit = {
        body: data,
        mode: 'cors',
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            // Content-Type will be set during FormData
        },
    };

    return executeRequest(auth, url, requestOptions);
}

export const deleteResource = (auth: AuthContextProps, endpoint: RestEndpoint, uid: string|undefined, queryParameters?: Map<string, number>): Promise<Response> => {
    const path = uid === undefined ? undefined : [uid];
    const url: string = createUrl(endpoint, path, queryParameters);

    const requestOptions: RequestInit = {
        mode: 'cors',
        method: 'DELETE',
    };

    return executeRequest(auth, url, requestOptions);
}