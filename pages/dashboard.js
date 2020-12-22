import Head from 'next/head'

import Layout from '../components/layout/Layout'
import Dashboard from '../components/dashboard/Dashboard'

import useUser from '../utilities/auth/useUser'

const DashboardPage = () => {

    //page is blocked if user is not signed in
    const {user} = useUser({redirectTo: "/"});

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