import Head from "next/head";

import Layout from "../components/layout/Layout";
import Dashboard from "../components/dashboard/Dashboard";
import LoadingSkeleton from "../components/layout/LoadingSkeleton";

import useAuth from "../lib/auth/useAuth";

const DashboardPage = (): JSX.Element => {
    //page is blocked if user is not signed in
    const { loading } = useAuth({ redirectTo: "/" });

    if (loading) return <LoadingSkeleton />;

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
