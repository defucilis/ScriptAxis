import Layout from '../../components/Layout'
import {useRouter} from 'next/router'
import ScriptUtils from '../../utilities/ScriptUtils'
import ScriptGrid from '../../components/ScriptGrid'
import Head from 'next/head'
import firebase from '../../utilities/Firebase'

const Author = ({scripts}) => {

    const router = useRouter();
    const {authorname} = router.query;

    return (
        <Layout page="authors">
         <Head>
                <title>ScriptAxis | {authorname}</title>
            </Head>
            <h1>Author {authorname}</h1>
            <ScriptGrid scripts={scripts} />
        </Layout>
    )
}

export async function getServerSideProps({query}) {
    const db = firebase.firestore();
    const dbQuery = db.collection("scripts").where("author", "==", query.authorname);
    const snapshot = await dbQuery.get();
    //we do sorting on the server to avoid needing to create a composite key
    //maybe we should just create one? Something to research
    const scripts = snapshot.docs
        .map(doc => ScriptUtils.parseScriptDocument(doc))
        .sort((a, b) => b.created - a.created);
    return {
        props: {
            scripts
        }
    }
}

export default Author;