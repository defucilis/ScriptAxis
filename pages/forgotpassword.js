import {useState, useContext} from 'react'
import Layout from '../components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import firebase from '../utilities/Firebase'
import axios from 'axios'
import UserContext from '../utilities/UserContext'

import style from './signin.module.css'

const SignIn = () => {

    const [error, setError] = useState("");
    const {setUser} = useContext(UserContext);

    const reset = e => {
        const doReset = async (email, callback) => {
            setError("");
            try {
                await firebase.auth().sendPasswordResetEmail(email);
                callback({success: true});
            } catch(error) {
                console.log(error.message);
                callback({success: false, error: "Failed to send reset email - " + error.message});
            }
        }

        e.preventDefault();

        doReset(e.target.email.value, result => {
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
                <title>ScriptAxis | Forgot Password</title>
            </Head>
            <h1>Password Reset</h1>
            <p>Enter the email address you used to sign up. If it exists, we'll send a reset link to your inbox</p>
            <form onSubmit={reset} className={style.signin}>
                <label htmlFor="email">Email</label>
                <input id="email" />
                <input type="submit" value="Send Verification" />
                <p style={{color: "red"}}>{error}</p>
            </form>
        </Layout>
    )
}
export default SignIn;