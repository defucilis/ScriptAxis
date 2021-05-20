import Head from "next/head";

import Layout from "../components/layout/Layout";
import LoadingSkeleton from "../components/layout/LoadingSkeleton";

import useAuth from "../lib/auth/useAuth";
import { Script, ScriptStub } from "lib/types";
import { FetchScripts } from "./api/scripts";
import React, { useState } from "react";
import ScriptNeedingFunscript from "components/dashboard/ScriptNeedingFunscript";

const FunscriptUpload = ({ existingScripts }: { existingScripts: Script[] }): JSX.Element => {
    const { loading } = useAuth({ redirectToIfNotAdmin: "/" });
    const [scripts, setScripts] = useState(existingScripts);

    const handleComplete = (script: Script) => {
        setScripts(scripts.filter(s => s.id !== script.id));
    };

    if (loading) return <LoadingSkeleton />;

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

export async function getServerSideProps(): Promise<{ props: { existingScripts: ScriptStub[] } }> {
    let scripts = [];
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
        },
    };
}

export default FunscriptUpload;
