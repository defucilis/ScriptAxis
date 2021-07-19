import Head from "next/head";

import Layout from "../components/layout/Layout";
import Dashboard from "../components/dashboard/Dashboard";

import getUser from "lib/getUser";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { User } from "lib/types";
import PageSkeleton from "components/layout/PageSkeleton";

const DashboardPage = ({ user }: { user: User }): JSX.Element => {
    if (!user) return <PageSkeleton message={"You are not signed in"} />;

    return (
        <Layout>
            <Head>
                <title>ScriptAxis | Dashboard</title>
            </Head>
            <h1>Your Dashboard</h1>
            <Dashboard user={user} />
        </Layout>
    );
};
export default DashboardPage;

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const user = await getUser(ctx.req);
    return { props: { user } };
};
