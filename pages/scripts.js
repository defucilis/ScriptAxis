import Layout from '../components/layout/Layout'
import BrowseScripts from '../components/scripts/BrowseScripts'

import ScriptUtils from '../utilities/ScriptUtils'
import {QueryScripts} from './api/scripts/query'

const Scripts = ({propScripts, matchCount, tags, categories, query}) => {
    return (
        <Layout page="scripts">
            <BrowseScripts propScripts={propScripts} scriptCount={matchCount} tags={tags} categories={categories} query={query} />
        </Layout>
    )
}

export async function getServerSideProps({query}) {
    let scripts = [];
    let count = 0;
    let dbQuery = ScriptUtils.queryToObject(query);
    try {
        const output = await QueryScripts(dbQuery);
        count = output.count;
        scripts = output.scripts;
    } catch(error) {
        console.log("Failed to load scripts", error);
    } finally {
        return {
            props: {
                propScripts: !scripts || scripts.length === 0 ? [] : scripts.map(script => ScriptUtils.parseScriptDocument(script)),
                matchCount: count,
                query: dbQuery
            }
        }
    }
}

export default Scripts;