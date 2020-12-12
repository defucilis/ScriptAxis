import {useContext, useEffect} from 'react'
import Head from 'next/head'
import Router from 'next/router'

import Layout from '../components/layout/Layout'
import Dashboard from '../components/dashboard/Dashboard'

import UserContext from '../utilities/UserContext'

const DashboardPage = () => {

    //page is blocked if user is not signed in
    const {user} = useContext(UserContext);
    useEffect(() => {
        if(user !== null && user.waiting) return;
        if(user === null) Router.push("/");
    }, [user])

    return (
        <Layout>
            <Head>
                <title>ScriptAxis | Dashboard</title>
            </Head>
            <h1>Your Dashboard</h1>
            <Dashboard user={user}/>

        </Layout>
    )
}
export default DashboardPage;