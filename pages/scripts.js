import {useState, useEffect} from 'react'
import Layout from '../components/Layout'
import ScriptUtils from '../utilities/ScriptUtils'
import ScriptGrid from '../components/ScriptGrid'
import Head from 'next/head'
import firebase from '../utilities/Firebase'
import Fuse from 'fuse.js'

const Scripts = ({propScripts, query}) => {

    const [scripts, setScripts] = useState([]);
    useEffect(() => {
        setScripts(propScripts);
    }, [propScripts])

    const getHeadTitle = query => {
        return query.search || query.category || query.tag || "Scripts";
    }

    const getBodyTitle = query => {
        if(query.search) 
            return `Scripts matching "${query.search}"`
        if(query.category)
            return `${ScriptUtils.getPrettyCategory(query.category)} Scripts`;
        if(query.tag)
            return `Scripts tagged with ${ScriptUtils.getPrettyCategory(query.tag)}`;
        return "All Scripts";
    }

    return (
        <Layout page="scripts">
            <Head>
                <title>ScriptAxis | {getHeadTitle(query)}</title>
            </Head>
            <h1 style={{marginBottom: "0.5em"}}>{getBodyTitle(query)}</h1>
            <ScriptGrid scripts={scripts} />
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
    
    return {
        props: {
            propScripts: scripts,
            query
        }
    }
}

export default Scripts;