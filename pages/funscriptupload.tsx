import Head from "next/head";

import Layout from "../components/layout/Layout";

import { Script, User } from "lib/types";
import { FetchScripts } from "./api/scripts";
import React, { useState } from "react";
import ScriptNeedingFunscript from "components/dashboard/ScriptNeedingFunscript";
import getUser from "lib/getUser";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import PageSkeleton from "components/layout/PageSkeleton";

const FunscriptUpload = ({
    existingScripts,
    user,
}: {
    existingScripts: Script[];
    user?: User;
}): JSX.Element => {
    const [scripts, setScripts] = useState(existingScripts);

    const handleComplete = (script: Script) => {
        setScripts(scripts.filter(s => s.id !== script.id));
    };

    if (!user || !user.isAdmin)
        return <PageSkeleton message={"You are not authorized to view this page"} />;

    return (
        <Layout>
            <Head>
                <title>ScriptAxis | Funscript Upload</title>
            </Head>
            <h1>Funscript Upload - {scripts.length} to go</h1>
            <div>
                {scripts.map(script => (
                    <ScriptNeedingFunscript
                        key={script.slug}
                        script={script}
                        onComplete={handleComplete}
                    />
                ))}
            </div>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (
    ctx: GetServerSidePropsContext
) => {
    let scripts = [];
    const user = await getUser(ctx.req);
    try {
        scripts = await FetchScripts(999, {
            createdAt: "asc",
        });
        scripts = scripts.filter(
            script => !script.funscript && script.sourceUrl.includes("discuss.eroscripts.com")
        );
    } catch (error) {
        console.log("Failed to load scripts", error);
    }
    return {
        props: {
            existingScripts: scripts,
            user,
        },
    };
}

export default FunscriptUpload;
