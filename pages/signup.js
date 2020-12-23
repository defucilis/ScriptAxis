import {useState} from 'react'
import Head from 'next/head'
import Router from 'next/router'

import axios from 'axios'
import firebase from '../utilities/initFirebase'

import Layout from '../components/layout/Layout'

import useUser from '../utilities/auth/useUser'

import style from './signin.module.css'

const SignUp = () => {

    const [error, setError] = useState("");
    const {login} = useUser();

    const signUp = e => {
        const doSignUp = async (email, username, password, callback) => {
            setError("");
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password);
                console.log(firebase.auth().currentUser);
                firebase.auth().currentUser.sendEmailVerification();
                const user = await axios.post("/api/users/create", {email, username});
                if(user.data.error) throw user.data.error;
                const finalUser = await login(email, password);
                console.log("Found user data", finalUser);
                callback({success: true});
            } catch(error) {
                firebase.auth().signOut();
                console.error(error.message);
                callback({success: false, error: { message: error.message }});
            }
        }

        e.preventDefault();

        if(e.target.password.value !== e.target.confirm.value) {
            setError("Passwords don't match!");
            return;
        }

        doSignUp(e.target.email.value, e.target.username.value, e.target.password.value, result => {
            if(result.success) {
                Router.push("/");
            } else {
                setError(ScriptUtils.tryFormatError(result.error));
            }
        })
    }

    return (
        <Layout>
            <Head>
                <title>ScriptAxis | Sign Up</title>
            </Head>
            <h1>Sign Up</h1>
            <p>I've disabled this page for now, sorry! The site isn't ready for people to create accounts and start adding scripts yet!</p>
            <p>You can follow my progress <a href="https://github.com/defucilis/ScriptAxis/projects/1">on GitHub</a> &lt;3</p>
        </Layout>
    )

    return (
        <Layout>
            <Head>
                <title>ScriptAxis | Sign Up</title>
            </Head>
            <h1>Sign In</h1>
            <form onSubmit={signUp} className={style.signin}>
                <label htmlFor="email">Email (not displayed publicly)</label>
                <input id="email" />
                <label htmlFor="username">Username</label>
                <input id="username" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" />
                <label htmlFor="confirm">Confirm Password</label>
                <input type="password" id="confirm" />
                <input type="submit" value="Sign Up" />
                <p style={{color: "red"}}>{error}</p>
            </form>
        </Layout>
    )
}
export default SignUp;