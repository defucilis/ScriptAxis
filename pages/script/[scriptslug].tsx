import { Script } from "lib/types";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
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

export const getServerSideProps: GetServerSideProps = async (
    ctx: GetServerSidePropsContext
) => {
    let script = null;
    try {
        script = await FetchScript(String(ctx.query.scriptslug));
    } catch (error) {
        console.error(error);
        return {
            notFound: true,
        }
    }

    if(!script) return {
        notFound: true,
    }

    return {
        props: {
            script,
        },
    };
}

export default ScriptPage;
