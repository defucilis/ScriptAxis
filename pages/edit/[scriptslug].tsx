import Head from "next/head";

import Layout from "../../components/layout/Layout";
import EditScript from "../../components/forms/EditScript";

import ScriptUtils from "../../lib/ScriptUtils";
import { FetchScript } from "../api/scripts/[scriptSlug]";
import { FetchLists } from "../api/loadlists";
import { roleIsCreator, roleIsModerator, Script, StringLists, User } from "lib/types";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
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
    listError,
}: StringLists & { script: Script; user?: User; listError?: string }): JSX.Element => {
    if (!user) return <PageSkeleton message={"You are not authorized to edit scripts"} />;
    if (script.userId !== user.id)
        return <PageSkeleton message={"You are not authorized to edit this script"} />;

    return (
        <Layout page="scripts">
            <Head>
                <title>{`ScriptAxis | Editing "${script.name}"`}</title>
            </Head>
            <h1>Edit Script</h1>
            {!tags || !categories || !talent || !studios || !creators || listError ? (
                <div>
                    <p style={{ color: "salmon" }}>
                        Error - failed to populate form with data. Try refreshing the page.
                    </p>
                    <p style={{ color: "salmon" }}>Server Error:</p>
                    <pre style={{ color: "salmon", fontFamily: "monospace", marginLeft: "1rem" }}>
                        {JSON.stringify(listError, null, 2)}
                    </pre>
                </div>
            ) : (
                <EditScript
                    script={script}
                    tags={tags}
                    categories={categories}
                    talent={talent}
                    studios={studios}
                    creators={creators}
                    canDelete={
                        roleIsModerator(user.role) ||
                        (roleIsCreator(user.role) && script.userId === user.id)
                    }
                />
            )}
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    let script = null;
    let data: StringLists = null;
    const user = await getUser(ctx.req);
    let listError = "";
    try {
        //the 'true' means that the view count won't be updated for this fetch
        script = await FetchScript(String(ctx.query.scriptslug), true);
        data = ScriptUtils.removeCountFromLists(await FetchLists());
        console.log(script);
    } catch (error) {
        console.error(error);
        listError = error.message;
    }
    return {
        props: {
            script,
            user,
            ...data,
            listError,
        },
    };
};

export default EditScriptPage;
