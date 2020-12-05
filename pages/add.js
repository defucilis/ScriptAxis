import Layout from '../components/Layout'
import AddScriptForm from '../components/AddScriptForm'
import firebase from '../utilities/Firebase'
import Head from 'next/head'

const Add = ({tags, categories}) => {
    return (
        <Layout>
            <Head>
                <title>ScriptAxis | Add Script</title>
            </Head>
            <h1>Add a Script</h1>
            <AddScriptForm tags={tags} categories={categories}/>
        </Layout>
    )
}

export async function getServerSideProps() {
    const db = firebase.firestore();
    let dbQuery = db.collection("tags");
    let snapshot = await dbQuery.get();
    const tags = snapshot.docs.map(doc => doc.id);
    dbQuery = db.collection("categories");
    snapshot = await dbQuery.get();
    const categories = snapshot.docs.map(doc => doc.id);
    return {
        props: {
            tags,
            categories
        }
    }
}

export default Add;