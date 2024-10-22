export interface AuthContextProps {
    username: string,
    roles: string[];
    isAuthenticated: boolean;
    accessToken: string | undefined;

    removeUser(): Promise<void>;
}

export const useAuth = (): AuthContextProps => {

    return {
        username: "",
        roles: [],
        isAuthenticated: true,
        accessToken: "",

        removeUser(): Promise<void> {
            return Promise.resolve(undefined);
        },
    }

}