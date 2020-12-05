import {useState, useEffect} from 'react'
import Layout from '../components/Layout'
import ScriptUtils from '../utilities/ScriptUtils'
import ScriptGrid from '../components/ScriptGrid'
import Head from 'next/head'
import firebase from '../utilities/Firebase'

const Scripts = ({propScripts}) => {

    const [scripts, setScripts] = useState([]);
    useEffect(() => {
        setScripts(propScripts);
    }, [propScripts])

    return (
        <Layout page="scripts">
            <Head>
                <title>ScriptAxis | Scripts</title>
            </Head>
            <h1>Scripts</h1>
            <ScriptGrid scripts={scripts} />
        </Layout>
    )
}

export async function getServerSideProps() {
    const db = firebase.firestore();
    const dbQuery = db.collection("scripts").orderBy("created", "desc");
    const snapshot = await dbQuery.get();
    const scripts = snapshot.docs.map(doc => ScriptUtils.parseScriptDocument(doc.data()));
    return {
        props: {
            propScripts: scripts
        }
    }
}

export default Scripts;