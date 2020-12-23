import {useState} from 'react'

import useUser from '../../utilities/auth/useUser'

const AuthTest = () => {
    const {user, logout, login} = useUser();

    const trySignin = e => {

        const doSignIn = async (email, password) => {
            const response = await login(email, password, {redirectTo: "/temp/authtest"});
        }

        e.preventDefault();
        doSignIn(e.target.email.value, e.target.password.value);
    }

    if(!user) {
        return (
            <div>
                <p>You are not signed in</p>
                <form onSubmit={trySignin}>
                    <input type="text" id="email" placeholder="email"/>
                    <input type="password" id="password" />
                    <input type="submit" value="Sign In" />
                </form>
            </div>
        )
    }

    return (
        <div>
            <p>You are signed in</p>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <button onClick={() => logout({redirectTo: "/temp/authtest"})}>Logout</button>
        </div>
    )
}

export default AuthTest;