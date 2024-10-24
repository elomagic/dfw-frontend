import {AuthContextProps, useAuth} from "./Auth.ts";
import React from "react";
import {Navigate, useLocation} from "react-router-dom";

export const SubscriptionsContext: React.Context<string[]> = React.createContext(["BASIC"]);

const hasRole = (auth: AuthContextProps, roles: string[]|string): boolean => {
    if (auth.accessToken === undefined) {
        return false;
    }

    const requiredRoles = (roles instanceof String) ? [roles] : roles;

    return auth.roles ? auth.roles.filter(v => requiredRoles.includes(v)).length > 0 : false;
}

interface ProtectedProps {
    roles?: string[];
    children?: React.ReactNode;
}

export const ProtectedRoute = ({ children }: Element|any, props: ProtectedProps) => {
    const auth = useAuth();
    const location = useLocation();

    if (!auth.isAuthenticated || (props.roles !== undefined && !hasRole(auth, props.roles))) {
        return (
            <SubscriptionsContext.Consumer>
                { () => <Navigate to="/home" replace state={{ from: location }} /> }
            </SubscriptionsContext.Consumer>
    );
    }

    return children;
};
