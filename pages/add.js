import Layout from '../components/Layout'
import AddScriptForm from '../components/AddScriptForm'
import firebase from '../utilities/Firebase'
import Head from 'next/head'
import {useContext, useEffect} from 'react'
import UserContext from '../utilities/UserContext'

const Add = ({tags, categories}) => {

    //page is blocked if user is not signed in
    const {user} = useContext(UserContext);
    useEffect(() => {
        if(user.waiting) return;
        if(user === null) Router.push("/");
    }, [user])

    const signOut = () => {
        firebase.auth().signOut();
        Router.push("/");
    }

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