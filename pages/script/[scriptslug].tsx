import { Script } from "lib/types";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";

import Layout from "../../components/layout/Layout";
import ScriptDetails from "../../components/scripts/ScriptDetails";

import { FetchScript } from "../api/scripts/[scriptSlug]";

const ScriptPage = ({ script, error }: { script: Script; error?: string }): JSX.Element => {
    return (
        <Layout page="scripts">
            <Head>
                <title>ScriptAxis | {script?.name || "Error"}</title>
            </Head>
            {error ? (
                <p style={{ color: "salmon" }}>
                    {error.includes("too many connections")
                        ? "Too many database connections! I'm looking into this issue, but for now, try waiting five minutes and refreshing the page"
                        : "Failed to get script! Server error: " + error}
                </p>
            ) : (
                <ScriptDetails script={script} />
            )}
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    let script = null;
    try {
        script = await FetchScript(String(ctx.query.scriptslug));
    } catch (error) {
        console.error(error);
        if (error.message.includes("too many connections")) {
            return {
                props: {
                    error: error.message,
                },
            };
        }

        return {
            notFound: true,
        };
    }

    if (!script)
        return {
            notFound: true,
        };

    return {
        props: {
            script,
        },
    };
};

export default ScriptPage;
