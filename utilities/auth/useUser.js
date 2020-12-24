import { useEffect, useState, useContext, createContext } from 'react'
import { useRouter } from 'next/router'

import firebase from 'firebase/app'
import 'firebase/auth'
import axios from 'axios'

import {
    removeUserCookie,
    setUserCookie,
    getUserFromCookie,
} from './userCookies'
import { mapUserData } from './mapUserData'

const authContext = createContext();

const useProvideAuth = () => {
    const [user, setUser] = useState();
    const [fbUser, setFbUser] = useState();
    const [updatingFromDb, setUpdatingFromDb] = useState(false);
    const router = useRouter()

    //Promise-style login method
    const login = async (email, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log("Trying to login with credentials", email, password);
                const user = await firebase.auth().signInWithEmailAndPassword(email, password);
                let userData = await mapUserData(user.user);
                userData = await addDbUserToCookie(userData);
                console.log("Login success!", userData);
                resolve(userData);
            } catch(error) {
                reject(error);
            }
        })
    }

    //Logs user in, then automatically redirects to the chosen page
    const loginAndRedirect = async (email, password, redirectTo) => {
        try {
            await login(email, password);
            router.push(redirectTo);
        } catch(error) {
            console.error("Failed to login", error);
        }
    }

    //Explicitly updates an existing user value with updated information from the database
    //Userful if we've just changed somethjing like the user's display name, liked / owner scripts, etc
    const refreshUserDbValues = () => {
        return new Promise(async (resolve, reject) => {
            if(updatingFromDb) {
                reject("Already running DB refresh");
                return;
            }
            setUpdatingFromDb(true);
            try {
                if(!fbUser) throw "User is not logged in!";

                const newUserData = await addDbUserToCookie(fbUser);
                setUpdatingFromDb(false);
                resolve(newUserData);
            } catch(error) {
                setUpdatingFromDb(false);
                reject(error);
            }
        })
    }

    //Promise-style logout method
    const logout = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await firebase.auth().signOut();
                resolve(result);
            } catch(error) {
                reject(error);
            }
        })
    }

    //Logs user out, then automatically redirects to the chosen page
    const logoutAndRedirect = async (redirectTo) => {
        console.log("Logging out");
        return firebase
            .auth()
            .signOut()
            .then(() => {
                // Sign-out successful.
                console.log("Logout success, redirecting to ", redirectTo);
                if(redirectTo) router.push(redirectTo);
            })
            .catch((e) => {
                console.error("Logout failed", e)
            })
    }

    //internal method that fetches user info from database and attaches it to the firebase auth user object
    const addDbUserToCookie = user => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log("Updating user from DB table...");
                const response = await axios.post("/api/users/email", {email: user.email, lean: true});
                let userData = {...user, ...response.data};
                const userFromCookie = getUserFromCookie();
                if(userFromCookie) userData = {...userFromCookie, ...userData};
                setUserCookie(userData);
                setUser(userData);
                resolve(userData);
            } catch(error) {
                reject(error);
            }
        })
    }
    
    // Firebase updates the id token every hour, this
    // makes sure the react state and the cookie are
    // both kept up to date
    useEffect(() => {
        console.log("Adding listener");
        const cancelAuthListener = firebase
            .auth()
            .onIdTokenChanged(async (user) => {
                if (user) {
                    console.log("ID token received for user ", user.email);
                    let userData = await mapUserData(user);
                    setFbUser(userData);
                } else {
                    console.log("ID token unset - removing cookie and user");
                    setFbUser(null);
                    setUser(null);
                    removeUserCookie();
                }
            });

        return () => {
            cancelAuthListener()
        }
    }, []);

    //Fetch the stored cookie on load
    useEffect(() => {
        const userFromCookie = getUserFromCookie();
        if (!userFromCookie) {
            console.warn("No user cookie is present");
            setFbUser(null);
            setUser(null);
            return
        }
        setUser(userFromCookie);
    }, [])

    useEffect(() => {
        if(!fbUser) {
            return;
        }
        refreshUserDbValues();
    }, [fbUser])

    return { user, login, loginAndRedirect, logout, logoutAndRedirect, refreshUserDbValues }
}

const AuthProvider = ({children}) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

const useUser = props => {

    const { user, login, loginAndRedirect, logout, logoutAndRedirect, refreshUserDbValues } = useContext(authContext);
    const router = useRouter()
    const [redirecting, setRedirecting] = useState(false);

    useEffect(() => {
        //user is null when explicitly unset i.e. signed out or no token
        if(user === null && props && props.redirectTo && !redirecting) {
            setRedirecting(true);
            console.log("No user present, redirecting to", props.redirectTo);
            router.push(props.redirectTo);
        } else if(user && !user.isAdmin && props && props.redirectIfNotAdmin && !redirecting) {
            setRedirecting(true);
            console.log("Logged in user isn't an admin, redirecting to", props.redirectIfNotAdmin);
            router.push(props.redirectIfNotAdmin);
        }
    }, [props, user, redirecting])

    return useContext(authContext);
}

export {AuthProvider};
export default useUser;

//https://github.com/vercel/next.js/blob/canary/examples/with-firebase-authentication/components/FirebaseAuth.js