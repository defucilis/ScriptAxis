import Head from "next/head";

import Layout from "../components/layout/Layout";
import AdminPanel from "../components/dashboard/AdminPanel";

import { roleIsAdmin, Script, User } from "lib/types";
import { GetAllScripts } from "./api/admin/getScripts";
import getUser from "lib/getUser";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import PageSkeleton from "components/layout/PageSkeleton";

const Admin = ({
    user,
    existingScripts,
}: {
    user?: User;
    existingScripts: Script[];
}): JSX.Element => {
    if (!user || !roleIsAdmin(user.role))
        return <PageSkeleton message={"You are not authorized to view this page"} />;

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

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    let scripts = [];
    const user = await getUser(ctx.req);
    try {
        scripts = await GetAllScripts();
    } catch (error) {
        console.log("Failed to load scripts", error);
    }
    return {
        props: {
            existingScripts: scripts,
            user,
        },
    };
};

export default Admin;
