import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Query, Script } from "lib/types";
import Layout from "../components/layout/Layout";
import BrowseScripts from "../components/scripts/BrowseScripts";

import ScriptUtils from "../lib/ScriptUtils";
import { QueryScripts } from "./api/scripts/query";

const Scripts = ({
    propScripts,
    matchCount,
    query,
    error,
}: {
    propScripts: Script[];
    matchCount: number;
    query: Query;
    error?: string;
}): JSX.Element => {
    return (
        <Layout page="scripts">
            {error ? (
                <p style={{ color: "salmon" }}>
                    {error.includes("too many connections")
                        ? "Too many database connections! I'm looking into this issue, but for now, try waiting five minutes and refreshing the page"
                        : "Failed to get scripts! Server error: " + error}
                </p>
            ) : (
                <BrowseScripts propScripts={propScripts} scriptCount={matchCount} query={query} />
            )}
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    let scripts = [];
    let count = 0;
    const dbQuery = ScriptUtils.stringObjectToQuery(ctx.query);
    let fetchError = "";
    try {
        const output = await QueryScripts(dbQuery);
        count = output.count;
        scripts = output.scripts;
    } catch (error) {
        console.log("Failed to load scripts", error);
        fetchError = error.message;
    }

    return {
        props: {
            propScripts: scripts || [],
            matchCount: count,
            query: dbQuery,
            error: fetchError,
        },
    };
};

export default Scripts;
