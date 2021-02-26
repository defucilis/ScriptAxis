import { useEffect } from "react";
import Router from "next/router";
import Head from "next/head";

import Layout from "../../components/layout/Layout";
import EditScript from "../../components/forms/EditScript";
import LoadingSkeleton from "../../components/layout/LoadingSkeleton";

import ScriptUtils from "../../lib/ScriptUtils";
import useAuth from "../../lib/auth/useAuth";
import { FetchScript } from "../api/scripts/[scriptSlug]";
import { FetchLists } from "../api/loadlists";
import { Script, StringLists } from "lib/types";
import { GetServerSidePropsContext } from "next";

const EditScriptPage = ({
    script,
    tags,
    categories,
    talent,
    studios,
    creators,
}: StringLists & { script: Script }): JSX.Element => {
    //page is blocked if user is not signed in
    const { user, loading } = useAuth({ redirectTo: "/" });
    useEffect(() => {
        if (loading) return;

        //page is blocked if the user doesn't own this script!
        if (user && user.id !== script.userId) {
            Router.push("/");
        }
    }, [user, loading]);

    if (loading) return <LoadingSkeleton />;

    return (
        <Layout page="scripts">
            <Head>
                <title>{`ScriptAxis | Editing "${script.name}"`}</title>
            </Head>
            <h1>Edit Script</h1>
            <EditScript
                script={script}
                tags={tags}
                categories={categories}
                talent={talent}
                studios={studios}
                creators={creators}
            />
        </Layout>
    );
};

export async function getServerSideProps(
    ctx: GetServerSidePropsContext
): Promise<{ props: StringLists & { script: Script } }> {
    let script = null;
    let data: StringLists = null;
    try {
        //the 'true' means that the view count won't be updated for this fetch
        script = await FetchScript(String(ctx.query.scriptslug), true);
        data = ScriptUtils.removeCountFromLists(await FetchLists());
        console.log(script);
    } catch (error) {
        console.error(error);
    }
    return {
        props: {
            script,
            ...data,
        },
    };
}

export default EditScriptPage;
