import Layout from '../components/Layout'
import ScriptUtils from '../utilities/ScriptUtils'
import firebase from '../utilities/Firebase'
import Fuse from 'fuse.js'
import BrowseScripts from '../components/BrowseScripts'

const Scripts = ({propScripts, tags, categories, query}) => {
    return (
        <Layout page="scripts">
            <BrowseScripts propScripts={propScripts} tags={tags} categories={categories} query={query} />
        </Layout>
    )
}

export async function getServerSideProps({query}) {
    const db = firebase.firestore();
    let snapshot;
    let scripts;
    if(query.search) {
        //not ideal, but we need to pull the whole scripts collection just to search by name...
        //if I were to use a third party search service, or to write my own API, then I wouldn't need to do this
        const dbQuery = db.collection("scripts");
        snapshot = await dbQuery.get();
        scripts = snapshot.docs.map(doc => ScriptUtils.parseScriptDocument(doc));
        const fuse = new Fuse(scripts, {
            includeScore: true,
            keys: ["name"],
            threshold: 0.5
        });
        const results = fuse.search(query.search);
        scripts = results.map(result => result.item);
    } else if(query.tag) {
        const dbQuery = db.collection("scripts").where("tags", "array-contains", query.tag);
        snapshot = await dbQuery.get();
        scripts = snapshot.docs.map(doc => ScriptUtils.parseScriptDocument(doc)).sort((a, b) => b.created - a.created);
    } else if(query.category) {
        const dbQuery = db.collection("scripts").where("category", "==", query.category);
        snapshot = await dbQuery.get();
        scripts = snapshot.docs.map(doc => ScriptUtils.parseScriptDocument(doc)).sort((a, b) => b.created - a.created);
    } else {
        const dbQuery = db.collection("scripts").orderBy("created", "desc");
        snapshot = await dbQuery.get();
        scripts = snapshot.docs.map(doc => ScriptUtils.parseScriptDocument(doc));
    }

    if(!snapshot || !snapshot.docs) return {props: { propScripts: [] }}
    
    let dbQuery = db.collection("tags");
    snapshot = await dbQuery.get();
    const tags = snapshot.docs.map(doc => doc.id);
    dbQuery = db.collection("categories");
    snapshot = await dbQuery.get();
    const categories = snapshot.docs.map(doc => doc.id);

    return {
        props: {
            propScripts: scripts,
            categories,
            tags,
            query
        }
    }
}

export default Scripts;