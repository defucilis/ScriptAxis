import Layout from '../components/Layout'
import Head from 'next/head'
import Router from 'next/router'
import Link from 'next/link'
import firebase from '../utilities/Firebase'
import {useContext, useEffect} from 'react'
import UserContext from '../utilities/UserContext'

const Dashboard = () => {


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
                <title>ScriptAxis | Dashboard</title>
            </Head>
            <h1>Your Dashboard</h1>
            <button onClick={signOut}>Sign Out</button>
            {
                !user || !user.isAdmin ? null : (
                    <div>
                        <Link href="/testdata">
                            <a>Go to Admin Controls</a>
                        </Link>
                    </div>
                )
            }

        </Layout>
    )
}
export default Dashboard;