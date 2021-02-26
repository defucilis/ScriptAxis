import { useEffect, useState, useContext, createContext } from "react";
import { useRouter } from "next/router";

import firebase from "firebase/app";
import "firebase/auth";
import axios from "axios";

import { AuthContextValues, FbUser } from "./authTypes";

import { removeUserCookie, setUserCookie, getUserFromCookie } from "./userCookies";
import { mapUserData } from "./mapUserData";
import { User } from "lib/types";

const authContext = createContext<AuthContextValues>(null);

const useProvideAuth = () => {
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);
    const [fbUser, setFbUser] = useState<FbUser>();
    const [updatingFromDb, setUpdatingFromDb] = useState(false);
    const router = useRouter();

    //Promise-style login method
    const login = async (email: string, password: string) => {
        return new Promise<User>((resolve, reject) => {
            try {
                console.log("Trying to login with credentials", email, password);
                firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password)
                    .then(user => {
                        mapUserData(user.user).then(userData => {
                            addDbUserToCookie(userData).then(finalUser => {
                                console.log("Login success!", userData);
                                resolve(finalUser);
                            });
                        });
                    });
            } catch (error) {
                reject(error);
            }
        });
    };

    //Logs user in, then automatically redirects to the chosen page
    const loginAndRedirect = async (email: string, password: string, redirectTo: string) => {
        try {
            await login(email, password);
            router.push(redirectTo);
        } catch (error) {
            console.error("Failed to login", error);
        }
    };

    //Explicitly updates an existing user value with updated information from the database
    //Userful if we've just changed somethjing like the user's display name, liked / owner scripts, etc
    const refreshUserDbValues = () => {
        return new Promise<User>((resolve, reject) => {
            if (updatingFromDb) {
                reject("Already running DB refresh");
                return;
            }
            setUpdatingFromDb(true);
            try {
                if (!fbUser) throw "User is not logged in!";

                addDbUserToCookie(fbUser).then(newUserData => {
                    setUpdatingFromDb(false);
                    resolve(newUserData);
                });
            } catch (error) {
                setUpdatingFromDb(false);
                reject(error);
            }
        });
    };

    //Promise-style logout method
    const logout = async () => {
        return new Promise<void>((resolve, reject) => {
            try {
                firebase.auth().signOut().then(resolve);
            } catch (error) {
                reject(error);
            }
        });
    };

    //Logs user out, then automatically redirects to the chosen page
    const logoutAndRedirect = async (redirectTo: string) => {
        console.log("Logging out");
        return firebase
            .auth()
            .signOut()
            .then(() => {
                // Sign-out successful.
                console.log("Logout success, redirecting to ", redirectTo);
                if (redirectTo) router.push(redirectTo);
            })
            .catch(e => {
                console.error("Logout failed", e);
            });
    };

    //internal method that fetches user info from database and attaches it to the firebase auth user object
    const addDbUserToCookie = (user: FbUser) => {
        return new Promise<User>((resolve, reject) => {
            try {
                console.log("Updating user from DB table...");
                //does this still work with .then?
                axios.get(`/api/users/${user.email}?lean=true`).then(response => {
                    if (response.data.error) throw response.data.error;
                    const dbUser = response.data;
                    setUserCookie(dbUser);
                    setUser(dbUser);
                    setLoading(false);
                    resolve(dbUser);
                });
            } catch (error) {
                reject(error);
            }
        });
    };

    const signUp = (username: string, email: string, password: string) => {
        return new Promise<User>((resolve, reject) => {
            try {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(fbUser => {
                        console.log("Created Firebase user:", fbUser);
                        axios.post("/api/users/create", { email, username }).then(response => {
                            if (response.data.error) throw response.data.error;
                            const dbUser = response.data;
                            console.log("Created DB user:", dbUser);
                            login(email, password).then(resolve);
                        });
                    });
            } catch (error) {
                reject(error);
            }
        });
    };

    const signUpAndRedirect = async (
        username: string,
        email: string,
        password: string,
        redirectTo = "/"
    ) => {
        const response = await signUp(username, email, password);
        router.push(redirectTo);
        return response;
    };

    // Firebase updates the id token every hour, this
    // makes sure the react state and the cookie are
    // both kept up to date
    useEffect(() => {
        console.log("Adding listener");
        const cancelAuthListener = firebase.auth().onAuthStateChanged(async user => {
            if (user) {
                console.log("ID token received for user ", user.email);
                const userData = await mapUserData(user);
                setFbUser(userData);
            } else {
                console.log("ID token unset - removing cookie and user");
                setFbUser(null);
                setUser(null);
                setLoading(false);
                removeUserCookie();
            }
        });

        return () => {
            cancelAuthListener();
        };
    }, []);

    //Fetch the stored cookie on load
    useEffect(() => {
        const userFromCookie = getUserFromCookie();
        if (!userFromCookie) {
            console.warn("No user cookie is present");
            setFbUser(null);
            setUser(null);
            return;
        }
        setUser(userFromCookie);
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!fbUser) {
            return;
        }
        refreshUserDbValues();
    }, [fbUser]);

    return {
        user,
        loading,
        login,
        loginAndRedirect,
        logout,
        logoutAndRedirect,
        refreshUserDbValues,
        signUp,
        signUpAndRedirect,
    };
};

const AuthProvider = ({
    children,
}: {
    children: JSX.Element[] | JSX.Element | null;
}): JSX.Element => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

interface UseAuthProps {
    redirectTo?: string;
    redirectToIfNotAdmin?: string;
}

const useAuth = (props: UseAuthProps = {}): AuthContextValues => {
    /* eslint-disable @typescript-eslint/no-unused-vars*/
    const {
        user,
        loading,
        login,
        loginAndRedirect,
        logout,
        logoutAndRedirect,
        refreshUserDbValues,
        signUp,
        signUpAndRedirect,
    } = useContext(authContext);
    /* eslint-enable @typescript-eslint/no-unused-vars*/
    const router = useRouter();
    const [redirecting, setRedirecting] = useState(false);

    useEffect(() => {
        //user is null when explicitly unset i.e. signed out or no token
        if (user === null && props && props.redirectTo && !redirecting && !loading) {
            setRedirecting(true);
            console.log("No user present, redirecting to", props.redirectTo);
            router.push(props.redirectTo);
        } else if (
            user &&
            props &&
            props.redirectToIfNotAdmin &&
            !redirecting &&
            !loading &&
            !user.isAdmin
        ) {
            setRedirecting(true);
            console.log(
                "Logged in user isn't an admin, redirecting to",
                props.redirectToIfNotAdmin
            );
            router.push(props.redirectToIfNotAdmin);
        }
    }, [props, user, redirecting]);

    return useContext(authContext);
};

export { AuthProvider };
export default useAuth;

//https://github.com/vercel/next.js/blob/canary/examples/with-firebase-authentication/components/FirebaseAuth.js
