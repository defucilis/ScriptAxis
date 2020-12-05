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

export async function getServerSideProps({query}) {
    const db = firebase.firestore();
    const dbQuery = db.collection("scripts").where("slug", "==", query.scriptslug);
    const snapshot = await dbQuery.get();
    const scripts = snapshot.docs.map(doc => ScriptUtils.parseScriptDocument(doc.data()));
    return {
        props: {
            script : scripts && scripts.length > 0 ? scripts[0] : null
        }
    }
}

export default Script;