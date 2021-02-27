import { useState } from "react";
import Head from "next/head";
import Router from "next/router";

import Layout from "../components/layout/Layout";

import firebase from "../lib/initFirebase";

import style from "./signin.module.scss";
import ScriptUtils from "lib/ScriptUtils";

const SignIn = (): JSX.Element => {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");

    const reset = (e: React.FormEvent) => {
        const doReset = async (
            email: string,
            callback: (data: { success: boolean; error?: string }) => void
        ) => {
            setError("");
            try {
                await firebase.auth().sendPasswordResetEmail(email);
                callback({ success: true });
            } catch (error) {
                console.error(error.message);
                callback({
                    success: false,
                    error:
                        "Failed to send reset email - " + ScriptUtils.tryFormatError(error.message),
                });
            }
        };

        e.preventDefault();

        doReset(email, result => {
            if (result.success) {
                Router.push("/");
            } else {
                setError(result.error);
            }
        });
    };

    return (
        <Layout>
            <Head>
                <title>ScriptAxis | Forgot Password</title>
            </Head>
            <h1>Password Reset</h1>
            <p>
                {`Enter the email address you used to sign up. If it exists, we'll send a reset link
                to your inbox`}
            </p>
            <form onSubmit={reset} className={style.signin}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
                <input type="submit" value="Send Verification" />
                <p style={{ color: "red" }}>{error}</p>
            </form>
        </Layout>
    );
};
export default SignIn;
