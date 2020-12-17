import {useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'

import Layout from '../components/layout/Layout'

import useUser from '../utilities/auth/useUser'

import style from './signin.module.css'

const SignIn = () => {

    const [error, setError] = useState("");
    const {login} = useUser();

    const signIn = e => {
        const doSignIn = async (email, password, callback) => {
            setError("");
            try {
                await login(email, password);
                callback({success: true});
            } catch(error) {
                console.error(error);
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