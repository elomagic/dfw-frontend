export declare interface AuthContextProps {
    username: string | undefined;
    roles: string[];
    isAuthenticated: boolean;
    accessToken: string | undefined;

    removeUser(): Promise<void>;
    signinRedirect(formData: FormData): Promise<AuthContextProps>;
    signoutRedirect(): Promise<void>;
}

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
    username: string;
    token: string;
    roles: string[];
}

const _auth: AuthContextProps = {
    username: "",
    roles: [],
    isAuthenticated: true,
    accessToken: "",

    removeUser(): Promise<void> {
        this.username = undefined;
        this.roles = [];
        this.isAuthenticated = false;
        this.accessToken = undefined

        return Promise.resolve(undefined);
    },

    signoutRedirect(): Promise<void> {
        // TODO
        const url: RequestInfo = "/api/v1/logout";

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

        fetch(request)
            .then((res: Response) => {
                if (res.status >= 400) {
                    return Promise.reject(new Error(res.statusText));
                }

                return Promise.resolve(res);
            })
            .finally(() => _auth.removeUser());

        return Promise.resolve(undefined);
    },
    signinRedirect(formData: FormData): Promise<AuthContextProps> {
        _auth.removeUser()

        // TODO
        const url: RequestInfo = "/api/v1/authenticate";

        const requestOptions: RequestInit = {
            body: formData,
            mode: 'cors',
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json",
            },
        };

        const request = new Request(
            url,
            requestOptions);

        fetch(request)
            .then((res: Response) => {
                if (res.status >= 400) {
                    return Promise.reject(new Error(res.statusText));
                }

                return Promise.resolve(res);
            })
            .then((res: Response) => res.json())
            .then((dto: AuthenticationResponse) => {
                _auth.accessToken = dto.token;
                _auth.username = dto.username;
                _auth.roles = dto.roles;
            });

        return Promise.resolve(_auth);
    }
}

export const useAuth = (): AuthContextProps => {
    return _auth;
}
