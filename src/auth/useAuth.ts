
import {useContext} from "react";
import {AuthContext, AuthContextProps} from "./Auth.tsx";

export const useAuth = (): AuthContextProps => {
    const context: AuthContextProps | undefined = useContext(AuthContext);

    if (!context) {
        console.warn("AuthProvider context is undefined, please verify you are calling useAuth() as child of a <AuthProvider> component.");
    }

    return context as AuthContextProps;
};