import Layout from '../components/Layout'
import ScriptUtils from '../utilities/ScriptUtils'
import Fuse from 'fuse.js'
import BrowseScripts from '../components/BrowseScripts'
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
    let dbQuery = {
        filters: {},
        sorting: {
            created: "desc"
        }
    };
    try {
        
        if(query.search) dbQuery.filters.name = { contains: query.search, mode: "insensitive" };
        if(query.tag) dbQuery.filters.include = [query.tag];
        if(query.category) dbQuery.filters.category = { name: { equals: query.category }};
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