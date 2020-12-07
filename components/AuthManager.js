import {useState, useEffect, useMemo} from 'react'
import firebase from '../utilities/Firebase'
import UserContext from '../utilities/UserContext'
import axios from 'axios'

const AuthManager = ({children}) => {
    const [user, setUser] = useState({waiting: true});

    const refreshUserValue = email => {
        const doSignIn = async (email) => {
            try {
                const user = await axios("/api/users/email", {email});
                setUser(user.data)
                window.localStorage.setItem("userdata", JSON.stringify(user.data));
            } catch(error) {
                firebase.auth().signOut();
                window.localStorage.removeItem("userdata");
                console.log(error.message);
            }
        }

        doSignIn(email);
    }
    useEffect(() => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

        let valueFromLocalStorage = window.localStorage.getItem("userdata");
        if(valueFromLocalStorage) {
            //this value is temporary, and is just to 'hold the fort' while we wait the half-second or so
            //for the persistent auth state to fire off
            valueFromLocalStorage = JSON.parse(valueFromLocalStorage);
            setUser(valueFromLocalStorage);
        }
        
        firebase.auth().onAuthStateChanged(user => {
            if(user === null) {
                setUser(null);
                window.localStorage.removeItem("userdata");
                return;
            }
            let valueFromLocalStorage = window.localStorage.getItem("userdata");
            if(valueFromLocalStorage) valueFromLocalStorage = JSON.parse(valueFromLocalStorage);
            if(valueFromLocalStorage === user.email) {
                setUser(valueFromLocalStorage);
            } else {
                //a different user was signed in or something, weird...
                window.localStorage.removeItem("userdata");
            }
            refreshUserValue(user.email);
        });
      }, []);

    
    const userProviderValue = useMemo(() => ({user, setUser}), [user, setUser]);

    return (
        <UserContext.Provider value={userProviderValue}>
            {children}
        </UserContext.Provider>
    )
}

export default AuthManager;