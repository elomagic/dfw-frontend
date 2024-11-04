import {AuthContext, AuthContextProps} from "./Auth.tsx";
import {useContext} from "react";

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);

    if (!context) {
        console.warn("AuthProvider context is undefined, please verify you are calling useAuth() as child of a <AuthProvider> component.");
    }

    return context as AuthContextProps;
};