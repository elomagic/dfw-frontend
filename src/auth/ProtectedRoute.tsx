import {AuthContextProps} from "./Auth.tsx";
import {ReactNode} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useAuth} from "./useAuth.ts";

const hasRole = (auth: AuthContextProps, roles: string[]|string): boolean => {
    if (auth.accessToken === undefined) {
        return false;
    }

    const requiredRoles = (roles instanceof String) ? [roles] : roles;

    return auth.roles ? auth.roles.filter(v => requiredRoles.includes(v)).length > 0 : false;
}

declare interface ComponentProps {
    roles?: string[] | string;
    children?: ReactNode;
}

export const ProtectedRoute = (props: ComponentProps) => {
    const auth = useAuth();
    const location = useLocation();
    
    if (!auth.isAuthenticated || (props.roles !== undefined && !hasRole(auth, props.roles))) {
        return (<Navigate to="/home" replace state={{ from: location }} />);
    }

    return props.children;
};
