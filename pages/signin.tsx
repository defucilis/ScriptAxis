import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";

import Layout from "../components/layout/Layout";

import useAuth from "../lib/auth/useAuth";

import style from "./signin.module.scss";

const SignIn = (): JSX.Element => {
    const [error, setError] = useState("");
    const { login } = useAuth();
    const [waiting, setWaiting] = useState(false);
    const [data, setData] = useState({ email: "", password: "" });

    const signIn = (e: React.FormEvent) => {
        const doSignIn = async (
            email: string,
            password: string,
            callback: (data: { success: boolean; error?: string }) => void
        ) => {
            setError("");
            try {
                await login(email, password);
                callback({ success: true });
            } catch (error) {
                console.error(error);
                if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
                    callback({ success: false, error: "Incorrect username/password combination" });
                } else {
                    callback({
                        success: false,
                        error: "Unexpected authentication failure. Wait a minute and try again",
                    });
                }
            }
        };

        e.preventDefault();

        setWaiting(true);
        doSignIn(data.email, data.password, result => {
            if (result.success) {
                Router.push("/");
            } else {
                setWaiting(false);
                setError(result.error);
            }
        });
    };

    return (
        <Layout>
            <Head>
                <title>ScriptAxis | Sign In</title>
            </Head>
            <h1>Sign In</h1>
            <form onSubmit={signIn} className={style.signin}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    value={data.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setData({ ...data, [e.target.id]: e.target.value })
                    }
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={data.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setData({ ...data, [e.target.id]: e.target.value })
                    }
                />
                <Link href="/forgotpassword">
                    <a className={style.forgot}>Forgot Password</a>
                </Link>
                {waiting ? <p>Please wait...</p> : <input type="submit" value="Sign In" />}

                <p style={{ color: "red" }}>{error}</p>
            </form>
        </Layout>
    );
};
export default SignIn;
