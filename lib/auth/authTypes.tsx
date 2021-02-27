import { UiUser } from "lib/types";

export interface FbUser {
    uid: string;
    email: string;
    token: string;
}

export interface AuthContextValues {
    user: UiUser;
    loading: boolean;
    login: (email: string, password: string) => Promise<UiUser>;
    loginAndRedirect: (email: string, password: string, redirectTo: string) => Promise<void>;
    logout: () => Promise<void>;
    logoutAndRedirect: (redirectTo: string) => Promise<void>;
    refreshUserDbValues: () => Promise<UiUser>;
    signUp: (username: string, email: string, password: string) => Promise<UiUser>;
    signUpAndRedirect: (
        username: string,
        email: string,
        password: string,
        redirectTo?: string
    ) => Promise<UiUser>;
}
