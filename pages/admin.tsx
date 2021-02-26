import Head from "next/head";

import Layout from "../components/layout/Layout";
import AdminPanel from "../components/dashboard/AdminPanel";
import LoadingSkeleton from "../components/layout/LoadingSkeleton";

import { FetchSlugs } from "./api/scripts/allslugs";

import useAuth from "../lib/auth/useAuth";
import { ScriptStub } from "lib/types";

const Admin = ({ existingScripts }: { existingScripts: ScriptStub[] }): JSX.Element => {
    const { loading } = useAuth({ redirectToIfNotAdmin: "/" });

    if (loading) return <LoadingSkeleton />;

    return (
        <Layout>
            <Head>
                <title>ScriptAxis | Admin Functions</title>
            </Head>
            <h1>Admin Functions</h1>
            <AdminPanel existingScripts={existingScripts} />
        </Layout>
    );
};

export async function getServerSideProps(): Promise<{ props: { existingScripts: ScriptStub[] } }> {
    let scripts = [];
    try {
        scripts = await FetchSlugs();
    } catch (error) {
        console.log("Failed to load scripts", error);
    }
    return {
        props: {
            existingScripts: scripts,
        },
    };
}

export default Admin;
