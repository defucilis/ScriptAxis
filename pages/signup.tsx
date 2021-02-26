import { useState } from "react";
import Head from "next/head";
import Router from "next/router";

import axios from "axios";
import firebase from "../lib/initFirebase";

import Layout from "../components/layout/Layout";

import useUser from "../lib/auth/useUser";

import style from "./signin.module.scss";
import ScriptUtils from "lib/ScriptUtils";

const SignUp = (): JSX.Element => {
    const [error, setError] = useState("");
    const [signingUp, setSigningUp] = useState(false);
    const { login } = useUser();
    const [data, setData] = useState({ email: "", username: "", password: "", confirm: "" });

    const signUp = (e: React.FormEvent) => {
        const doSignUp = async (
            email: string,
            username: string,
            password: string,
            callback: (data: { success: boolean; error?: string }) => void
        ) => {
            setError("");
            try {
                setSigningUp(true);
                await firebase.auth().createUserWithEmailAndPassword(email, password);
                console.log(firebase.auth().currentUser);
                firebase.auth().currentUser.sendEmailVerification();
                const user = await axios.post("/api/users/create", { email, username });
                if (user.data.error) throw user.data.error;
                const finalUser = await login(email, password);
                console.log("Found user data", finalUser);
                setSigningUp(false);
                callback({ success: true });
            } catch (error) {
                firebase.auth().signOut();
                console.error(error.message);
                setSigningUp(false);
                callback({ success: false, error: error.message });
            }
        };

        e.preventDefault();

        if (data.password !== data.confirm) {
            setError("Passwords don't match!");
            return;
        }

        doSignUp(data.email, data.username, data.password, result => {
            if (result.success) {
                Router.push("/");
            } else {
                setError(ScriptUtils.tryFormatError(result.error));
            }
        });
    };

    return (
        <Layout>
            <Head>
                <title>ScriptAxis | Sign Up</title>
            </Head>
            <h1>Sign Up</h1>
            <p>
                {`I've disabled this page for now, sorry! The site isn't ready for people to create
                accounts and start adding scripts yet!`}
            </p>
            <p>
                You can follow my progress{" "}
                <a href="https://github.com/defucilis/ScriptAxis/projects/1">on GitHub</a> &lt;3
            </p>
        </Layout>
    );

    return (
        <Layout>
            <Head>
                <title>ScriptAxis | Sign Up</title>
            </Head>
            <h1>Sign In</h1>
            <form onSubmit={signUp} className={style.signin}>
                <label htmlFor="email">Email (not displayed publicly)</label>
                <input
                    id="email"
                    value={data.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setData({ ...data, [e.target.id]: e.target.value })
                    }
                />
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    value={data.username}
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
                <label htmlFor="confirm">Confirm Password</label>
                <input
                    type="password"
                    id="confirm"
                    value={data.confirm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setData({ ...data, [e.target.id]: e.target.value })
                    }
                />
                {signingUp ? <p>Please wait...</p> : <input type="submit" value="Sign Up" />}
                <p style={{ color: "red" }}>{error}</p>
            </form>
        </Layout>
    );
};
export default SignUp;
