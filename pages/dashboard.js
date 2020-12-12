import {useContext, useEffect} from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Link from 'next/link'

import firebase from '../utilities/Firebase'

import Layout from '../components/layout/Layout'

import UserContext from '../utilities/UserContext'

const Dashboard = () => {


    //page is blocked if user is not signed in
    const {user} = useContext(UserContext);
    useEffect(() => {
        if(user !== null && user.waiting) return;
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

            <div style={{marginBottom: "2em"}}>
                <h3>Your Favourite Scripts</h3>
                {
                    (!user || !user.likedScripts || user.likedScripts.length === 0)
                        ? (<p>You have no favorite scripts yet!</p>)
                        : (
                            <ul>
                                { user.likedScripts.map(script => {
                                    return (<ul key={script.slug}>
                                        <Link href={`/script/${script.slug}`}><a>{script.name}</a></Link>
                                    </ul>)
                                })}
                            </ul>
                        )
                }
            </div>

            <div style={{marginBottom: "2em"}}>
                <h3>Your Saved Searches</h3>
                {
                    (!user || !user.savedSearches || user.savedSearches.length === 0)
                        ? (<p>You have no saved searches yet!</p>)
                        : (
                            <ul>
                                { user.savedSearches.map(search => {
                                    return (<ul key={search}>
                                        <Link href={`/scripts?${search}`}><a>{search}</a></Link>
                                    </ul>)
                                })}
                            </ul>
                        )
                }
            </div>

            <button onClick={signOut}>Sign Out</button>
            {
                !(user && user.isAdmin) ? null : (
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