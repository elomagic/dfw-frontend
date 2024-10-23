

export declare interface SignoutRedirectArgs {
    url?: string;
}

export declare interface SigninRedirectArgs {
    url?: string;
}

export declare interface AuthContextProps {
    username: string | undefined;
    roles: string[];
    isAuthenticated: boolean;
    accessToken: string | undefined;

    removeUser(): Promise<void>;
    signinRedirect(args?: SigninRedirectArgs): Promise<void>;
    signoutRedirect(args?: SignoutRedirectArgs): Promise<void>;
}

const _auth: AuthContextProps = {
    username: "",
    roles: [],
    isAuthenticated: false,
    accessToken: "",

    removeUser(): Promise<void> {
        this.username = undefined;
        this.roles = [];
        this.isAuthenticated = false;
        this.accessToken = undefined

        return Promise.resolve(undefined);
    },
    signoutRedirect(args?: SignoutRedirectArgs): Promise<void> {
        return Promise.resolve(undefined);
    },
    signinRedirect(args?: SigninRedirectArgs): Promise<void> {
        return Promise.resolve(undefined);
    }
}

export const useAuth = (): AuthContextProps => {
    return _auth;
}

export const setUserSession = (username: string, roles: string[], accessToken: string): void => {
    _auth.isAuthenticated = true;
    _auth.username = username;
    _auth.roles = roles;
    _auth.accessToken = accessToken;
}
