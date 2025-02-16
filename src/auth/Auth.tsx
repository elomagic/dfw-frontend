import {ReactNode, createContext, useEffect, useState, ReactElement} from "react";

export interface AuthContextProps {
    mailAddress: string | undefined;
    displayName: string | undefined;
    language: string | undefined;
    roles: string[];
    isAuthenticated: boolean;
    accessToken: string | undefined;

    removeUser(): Promise<AuthContextProps>;
    signinRedirect(formData: FormData): Promise<AuthContextProps>;
    signoutRedirect(): Promise<Response>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);
AuthContext.displayName = "AuthContext";

export declare interface AuthProviderProps {
    children?: ReactNode;
}

declare interface AuthenticationResponse {
    mailAddress: string;
    displayName: string;
    language: string;
    token: string;
    roles: string[];
}

export const AuthProvider = (authProvider: AuthProviderProps): ReactElement => {

    const getAuthBaseUrl = (): string => {
        return import.meta.env.DEV ? import.meta.env.VITE_AUTH_URL : `${window.location.protocol}//${window.location.host}`;
    }

    const _auth: AuthContextProps = {
        mailAddress: undefined,
        displayName: undefined,
        language: undefined,
        roles: [],
        isAuthenticated: false,
        accessToken: undefined,

        removeUser(): Promise<AuthContextProps> {
            auth.mailAddress = undefined;
            auth.displayName = undefined;
            auth.language = undefined;
            auth.roles = [];
            auth.isAuthenticated = false;
            auth.accessToken = undefined;

            const a = {...auth};

            setAuth(a);

            return Promise.resolve(a);
        },

        async signoutRedirect(): Promise<Response> {
            const url: RequestInfo = `${getAuthBaseUrl()}/api/v1/logout`;

            const requestOptions: RequestInit = {
                mode: 'cors',
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${auth?.accessToken}`,
                    'Accept': 'application/json, application/vnd.elomagic.dfw+json',
                    'Accept-Language': `${auth.language ?? "en"}, *;q=0.5`
                },
            };

            const request = new Request(
                url,
                requestOptions);

            return fetch(request)
                .then((res: Response) => {
                    if (res.status >= 400) {
                        return Promise.reject(new Error(res.statusText));
                    }

                    return Promise.resolve(res);
                })
                .finally(() => auth.removeUser());
        },

        async signinRedirect(formData: FormData): Promise<AuthContextProps> {
            if (auth.isAuthenticated) {
                auth.removeUser().catch((reason) => console.error(reason));
            }

            const url: RequestInfo = `${getAuthBaseUrl()}/api/v1/authenticate`;

            const requestOptions: RequestInit = {
                body: formData,
                mode: 'cors',
                method: 'POST',
                headers: {
                    // Content-Type will be set during FormData
                    "Accept": "application/json",
                },
            };

            const request = new Request(
                url,
                requestOptions);

            return fetch(request)
                .then((res: Response) => {
                    if (res.status >= 400) {
                        return Promise.reject(new Error(res.statusText));
                    }

                    return Promise.resolve(res);
                })
                .then((res: Response) => res.json())
                .then((dto: AuthenticationResponse) => {
                    auth.mailAddress = dto.mailAddress;
                    auth.displayName = dto.displayName;
                    auth.language = dto.language;
                    auth.roles = dto.roles;
                    auth.isAuthenticated = true;
                    auth.accessToken = dto.token;

                    const a = {...auth};

                    setAuth(a);

                    return Promise.resolve(a);
                });
        }
    };

    const currentAuth = sessionStorage.getItem("currentAuth");
    const ca: AuthContextProps = currentAuth !== null ? {...JSON.parse(currentAuth),
        removeUser: _auth.removeUser,
        signinRedirect: _auth.signinRedirect,
        signoutRedirect: _auth.signoutRedirect,
    } : _auth;

    const [auth, setAuth] = useState(ca);

    useEffect(() => sessionStorage.setItem("currentAuth", JSON.stringify(auth)), [auth]);

    return (
        <AuthContext.Provider value={auth}>
            {authProvider.children}
        </AuthContext.Provider>
    );
}

export { }