import Layout from '../components/Layout'
import ScriptGrid from '../components/ScriptGrid'
import ScriptUtils from '../utilities/ScriptUtils'
import Head from 'next/head'
import firebase from '../utilities/Firebase'

const Index = ({scripts}) => {
    return (
        <Layout>
            <Head>
                <title>ScriptAxis | The Funscript Library (Work in Progress!)</title>
            </Head>
            <h1 style={{marginBottom: "0.5em"}}>Recently added scripts</h1>
            <ScriptGrid scripts={scripts}/>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    const db = firebase.firestore();
    const dbQuery = db.collection("scripts").orderBy("created", "desc").limit(12);
    const snapshot = await dbQuery.get();
    const scripts = snapshot.docs.map(doc => ScriptUtils.parseScriptDocument(doc));
    return {
        props: {
            scripts
        }
    }
}

export default Index;