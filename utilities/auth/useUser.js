import { useEffect, useState } from 'react'
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

const useUser = () => {
    const [user, setUser] = useState()
    const router = useRouter()

    const login = async (email, password, redirectTo) => {
        console.log("Trying to login with credentials", email, password);
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(async user => {
                console.log("Sign in success!", user);
                let userData = await mapUserData(user.user);
                await addDbUserToCookie(userData);
                if(redirectTo) router.push(redirectTo)
            })
            .catch(e => {
                console.error(e);
            })
    }

    const logout = async (redirectTo) => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                // Sign-out successful.
                if(redirectTo) router.push(redirectTo);
            })
            .catch((e) => {
                console.error(e)
            })
    }

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

    useEffect(() => {
        // Firebase updates the id token every hour, this
        // makes sure the react state and the cookie are
        // both kept up to date
        const cancelAuthListener = firebase
            .auth()
            .onIdTokenChanged(async (user) => {
                if (user) {
                    let userData = await mapUserData(user);
                    const userFromCookie = getUserFromCookie();
                    if(userFromCookie) userData = {...userFromCookie, ...userData};
                    setUserCookie(userData);
                    setUser(userData);
                } else {
                    removeUserCookie()
                    setUser()
                }
            })

        const userFromCookie = getUserFromCookie()
        if (!userFromCookie) {
            console.error("No cookie, redirecting to root");
            router.push('/')
            return
        }
        setUser(userFromCookie)

        return () => {
            cancelAuthListener()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { user, logout, login }
}

export default useUser;

//https://github.com/vercel/next.js/blob/canary/examples/with-firebase-authentication/components/FirebaseAuth.js