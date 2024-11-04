import {createContext, useState} from "react";

export interface AuthContextProps {
    mailAddress: string | undefined;
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
    auth_uri: string;
}

const _authConfig: AuthProviderProps = {
    auth_uri: "http://localhost:8080"
};

export const setAuthConfig = (config: AuthProviderProps): void => {
    _authConfig.auth_uri = config.auth_uri;
}

declare interface AuthenticationResponse {
    mailAddress: string;
    token: string;
    roles: string[];
}

const getAuthBaseUrl = (): string => {
    return import.meta.env.DEV ? import.meta.env.VITE_AUTH_URL : _authConfig.auth_uri;
}

export const AuthProvider = ({ children }): JSX.Element => {

    const _auth: AuthContextProps = {
        mailAddress: undefined,
        roles: [],
        isAuthenticated: false,
        accessToken: undefined,

        removeUser(): Promise<AuthContextProps> {
            this.mailAddress = undefined;
            auth.roles = [];
            auth.isAuthenticated = false;
            auth.accessToken = undefined;

            const _auth = Object.assign({}, this);

            setAuth(_auth);

            return Promise.resolve(_auth);
        },

        async signoutRedirect(): Promise<Response> {
            const url: RequestInfo = `${getAuthBaseUrl()}/api/v1/logout`;

            const requestOptions: RequestInit = {
                mode: 'cors',
                method: 'GET',
                headers: {
                    "Accept": "*/*",
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
                .finally(() => this.removeUser());
        },

        async signinRedirect(formData: FormData): Promise<AuthContextProps> {
            this.removeUser().catch((reason) => console.error(reason));

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
                    this.mailAddress = dto.mailAddress;
                    this.roles = dto.roles;
                    this.isAuthenticated = true;
                    this.accessToken = dto.token;

                    const _auth = Object.assign({}, this);

                    setAuth(_auth);

                    return Promise.resolve(_auth);
                });
        }
    };

    const [auth, setAuth] = useState(_auth);

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}

export { }