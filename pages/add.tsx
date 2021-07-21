import Head from "next/head";
import Layout from "../components/layout/Layout";
import AddScript from "../components/forms/AddScript";

import { FetchLists } from "./api/loadlists";
import ScriptUtils from "../lib/ScriptUtils";
import { roleIsCreator, StringLists, User } from "lib/types";
import PageSkeleton from "components/layout/PageSkeleton";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import getUser from "lib/getUser";
import { useEffect } from "react";

const Add = ({
    user,
    tags,
    categories,
    talent,
    studios,
    creators,
    listError,
}: StringLists & { user?: User; listError?: string }): JSX.Element => {
    if (!user || !roleIsCreator(user.role))
        return <PageSkeleton message={"You are not authorized to add new scripts"} />;

    useEffect(() => {
        console.log("Loaded add script page with the following lists: ", {
            tags,
            categories,
            talent,
            studios,
            creators,
        });
    }, [tags, categories, talent, studios, creators]);

    return (
        <Layout>
            <Head>
                <title>ScriptAxis | Add Script</title>
            </Head>
            <h1>Add a Script</h1>
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
                <AddScript
                    user={user}
                    tags={tags}
                    categories={categories}
                    talent={talent}
                    studios={studios}
                    creators={creators}
                />
            )}
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    let data = {};
    const user = await getUser(ctx.req);
    let listError = "";

    try {
        data = ScriptUtils.removeCountFromLists(await FetchLists());
    } catch (error) {
        console.log("Failed to get scripts", error);
        listError = error.message;
    }

    return {
        props: {
            user,
            listError,
            ...data,
        },
    };
};

export default Add;
