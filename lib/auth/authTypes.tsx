import { User } from "lib/types";

export interface FbUser {
    uid: string;
    email: string;
    token: string;
}

export interface AuthContextValues {
    user: User;
    loading: boolean;
    login: (email: string, password: string) => Promise<User>;
    loginAndRedirect: (email: string, password: string, redirectTo: string) => Promise<void>;
    logout: () => Promise<void>;
    logoutAndRedirect: (redirectTo: string) => Promise<void>;
    refreshUserDbValues: () => Promise<User>;
    signUp: (username: string, email: string, password: string) => Promise<User>;
    signUpAndRedirect: (
        username: string,
        email: string,
        password: string,
        redirectTo?: string
    ) => Promise<User>;
}
