import Head from "next/head";

import firebase from "../lib/initFirebase";

import Layout from "../components/layout/Layout";
import AddScript from "../components/forms/AddScript";

import useAuth from "../lib/auth/useAuth";
import { FetchLists } from "./api/loadlists";
import ScriptUtils from "../lib/ScriptUtils";
import { StringLists } from "lib/types";
import LoadingSkeleton from "components/layout/LoadingSkeleton";

const Add = ({ tags, categories, talent, studios, creators }: StringLists): JSX.Element => {
    //page is blocked if user is not signed in
    const { user, loading } = useAuth({ redirectTo: "/" });

    const resend = async () => {
        try {
            await firebase.auth().currentUser.sendEmailVerification();
        } catch (error) {
            console.error(error.message);
            alert("Failed to send verificationemail\n" + ScriptUtils.tryFormatError(error.message));
        }
    };

    if (loading) return <LoadingSkeleton />;

    return (
        <Layout>
            <Head>
                <title>ScriptAxis | Add Script</title>
            </Head>
            <h1>Add a Script</h1>
            {user && user.emailVerified ? (
                <AddScript
                    tags={tags}
                    categories={categories}
                    talent={talent}
                    studios={studios}
                    creators={creators}
                />
            ) : (
                <div>
                    <p>Please verify your email address to create scripts</p>
                    <button onClick={resend}>Resend Verification Email</button>
                </div>
            )}
        </Layout>
    );
};

export async function getServerSideProps(): Promise<{ props: any }> {
    let data = {};
    try {
        data = ScriptUtils.removeCountFromLists(await FetchLists());
    } catch (error) {
        console.log("Failed to get scripts", error);
    }

    return {
        props: {
            ...data,
        },
    };
}

export default Add;
