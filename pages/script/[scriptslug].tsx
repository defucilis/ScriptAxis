import { Script } from "lib/types";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

import Layout from "../../components/layout/Layout";
import ScriptDetails from "../../components/scripts/ScriptDetails";

import { FetchScript } from "../api/scripts/[scriptSlug]";

const ScriptPage = ({ script }: { script: Script }): JSX.Element => {
    return (
        <Layout page="scripts">
            <Head>
                <title>ScriptAxis | {script.name}</title>
            </Head>
            <ScriptDetails script={script} />
        </Layout>
    );
};

export async function getServerSideProps(
    ctx: GetServerSidePropsContext
): Promise<{ props: { script: Script } }> {
    let script = null;
    try {
        script = await FetchScript(String(ctx.query.scriptslug));
    } catch (error) {
        console.error(error);
    }

    return {
        props: {
            script,
        },
    };
}

export default ScriptPage;
