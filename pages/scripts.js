import Layout from '../components/layout/Layout'
import BrowseScripts from '../components/scripts/BrowseScripts'

import ScriptUtils from '../utilities/ScriptUtils'
import {QueryScripts} from './api/scripts/query'

const Scripts = ({propScripts, tags, categories, query}) => {
    return (
        <Layout page="scripts">
            <BrowseScripts propScripts={propScripts} tags={tags} categories={categories} query={query} />
        </Layout>
    )
}

export async function getServerSideProps({query}) {
    let scripts = [];
    let dbQuery = ScriptUtils.queryToObject(query);
    try {
        scripts = await QueryScripts(dbQuery);
    } catch(error) {
        console.log("Failed to load scripts", error);
    } finally {
        return {
            props: {
                propScripts: !scripts || scripts.length === 0 ? [] : scripts.map(script => ScriptUtils.parseScriptDocument(script)),
                query: dbQuery
            }
        }
    }
}

export default Scripts;