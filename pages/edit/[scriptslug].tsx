import Head from "next/head";

import Layout from "../../components/layout/Layout";
import EditScript from "../../components/forms/EditScript";

import ScriptUtils from "../../lib/ScriptUtils";
import { FetchScript } from "../api/scripts/[scriptSlug]";
import { FetchLists } from "../api/loadlists";
import { Script, StringLists, User } from "lib/types";
import { GetServerSidePropsContext } from "next";
import getUser from "lib/getUser";
import PageSkeleton from "components/layout/PageSkeleton";

const EditScriptPage = ({
    user,
    script,
    tags,
    categories,
    talent,
    studios,
    creators,
}: StringLists & { script: Script; user?: User }): JSX.Element => {
    if (!user) return <PageSkeleton message={"You are not authorized to edit scripts"} />;
    if (script.userId !== user.id)
        return <PageSkeleton message={"You are not authorized to edit this script"} />;

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
                isAdmin={user.isAdmin}
            />
        </Layout>
    );
};

export async function getServerSideProps(
    ctx: GetServerSidePropsContext
): Promise<{ props: StringLists & { script: Script; user?: User } }> {
    let script = null;
    let data: StringLists = null;
    const user = await getUser(ctx.req);
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
            user,
            ...data,
        },
    };
}

export default EditScriptPage;
