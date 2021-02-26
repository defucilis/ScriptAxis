import {GetServerSidePropsContext} from 'next'
import { Query, Script } from "lib/types";
import Layout from "../components/layout/Layout";
import BrowseScripts from "../components/scripts/BrowseScripts";

import ScriptUtils from "../lib/ScriptUtils";
import { QueryScripts } from "./api/scripts/query";

const Scripts = ({ propScripts, matchCount, query }: {
    propScripts: Script[],
    matchCount: number,
    query: Query
}): JSX.Element => {
    return (
        <Layout page="scripts">
            <BrowseScripts
                propScripts={propScripts}
                scriptCount={matchCount}
                query={query}
            />
        </Layout>
    );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext): Promise<{props: {propScripts: Script[], matchCount: number, query: Query}}> {
    let scripts = [];
    let count = 0;
    const dbQuery = ScriptUtils.stringObjectToQuery(ctx.query);
    try {
        const output = await QueryScripts(dbQuery);
        count = output.count;
        scripts = output.scripts;
    } catch (error) {
        console.log("Failed to load scripts", error);
    }

    return {
        props: {
            propScripts:
                !scripts || scripts.length === 0
                    ? []
                    : scripts.map(script => ScriptUtils.parseScriptDocument(script)),
            matchCount: count,
            query: dbQuery,
        },
    };
}

export default Scripts;
