import Head from "next/head";
import Layout from "../components/layout/Layout";
import AddScript from "../components/forms/AddScript";

import { FetchLists } from "./api/loadlists";
import ScriptUtils from "../lib/ScriptUtils";
import { StringLists, User } from "lib/types";
import PageSkeleton from "components/layout/PageSkeleton";
import { GetServerSidePropsContext } from "next";
import getUser from "lib/getUser";

const Add = ({
    user,
    tags,
    categories,
    talent,
    studios,
    creators,
}: StringLists & { user?: User }): JSX.Element => {
    if (!user || !user.isAdmin)
        return <PageSkeleton message={"You are not authorized to add new scripts"} />;

    return (
        <Layout>
            <Head>
                <title>ScriptAxis | Add Script</title>
            </Head>
            <h1>Add a Script</h1>
            <AddScript
                user={user}
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
    context: GetServerSidePropsContext
): Promise<{ props: any }> {
    let data = {};
    const user = await getUser(context.req);

    try {
        data = ScriptUtils.removeCountFromLists(await FetchLists());
    } catch (error) {
        console.log("Failed to get scripts", error);
    }

    return {
        props: {
            user,
            ...data,
        },
    };
}

export default Add;
