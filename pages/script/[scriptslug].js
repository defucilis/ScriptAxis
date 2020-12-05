import Layout from '../../components/Layout'
import ScriptUtils from '../../utilities/ScriptUtils'
import ScriptDetails from '../../components/ScriptDetails'
import Head from 'next/head'
import firebase from '../../utilities/Firebase'

const Script = ({script}) => {

    return (
        <Layout page="scripts">
            <Head>
                <title>ScriptAxis | {script.name}</title>
            </Head>
            <ScriptDetails script={script} />
        </Layout>
    )
}

export async function getServerSideProps({query,res}) {
    const db = firebase.firestore();
    const dbQuery = db.collection("scripts").where("slug", "==", query.scriptslug);
    const snapshot = await dbQuery.get();
    const scripts = snapshot.docs.map(doc => ScriptUtils.parseScriptDocument(doc.data()));
    if(!scripts || scripts.length === 0) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            script : scripts[0]
        }
    }
}

export default Script;