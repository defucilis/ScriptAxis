import Head from "next/head";

import Layout from "../components/layout/Layout";
import Dashboard from "../components/dashboard/Dashboard";

import useUser from "../lib/auth/useUser";

const DashboardPage = (): JSX.Element => {
    //page is blocked if user is not signed in
    useUser({ redirectTo: "/" });

    return (
        <Layout>
            <Head>
                <title>ScriptAxis | Dashboard</title>
            </Head>
            <h1>Your Dashboard</h1>
            <Dashboard />
        </Layout>
    );
};
export default DashboardPage;
