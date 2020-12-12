import {useState, useContext} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'

import axios from 'axios'
import firebase from '../utilities/Firebase'

import Layout from '../components/layout/Layout'

import UserContext from '../utilities/UserContext'

import style from './signin.module.css'

const SignIn = () => {

    const [error, setError] = useState("");
    const {setUser} = useContext(UserContext);

    const signIn = e => {
        const doSignIn = async (email, password, callback) => {
            setError("");
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password);
                const user = await axios.post("/api/users/email", {email});
                if(user.data.error) throw user.data.error;
                setUser(user.data)
                console.log("Found user data", user.data);
                window.localStorage.setItem("userdata", JSON.stringify(user.data));
                callback({success: true});
            } catch(error) {
                firebase.auth().signOut();
                window.localStorage.removeItem("userdata");
                console.error(ScriptUtils.tryFormatError(error.message));
                callback({success: false, error: "Incorrect username/password combination"});
            }
        }

        e.preventDefault();

        doSignIn(e.target.email.value, e.target.password.value, result => {
            if(result.success) {
                Router.push("/");
            } else {
                setError(result.error);
            }
        })
    }

    return (
        <Layout>
            <Head>
                <title>ScriptAxis | Sign In</title>
            </Head>
            <h1>Sign In</h1>
            <form onSubmit={signIn} className={style.signin}>
                <label htmlFor="email">Email</label>
                <input id="email" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" />
                <Link href="/forgotpassword"><a className={style.forgot}>Forgot Password</a></Link>
                <input type="submit" value="Sign In" />
                <p style={{color: "red"}}>{error}</p>
            </form>
        </Layout>
    )
}
export default SignIn;