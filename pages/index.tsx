import { useState, useEffect } from "react";

import Head from "next/head";

import axios from "axios";
import { FaCog } from "react-icons/fa";

import Layout from "../components/layout/Layout";
import ScriptGrid from "../components/scripts/ScriptGrid";

import style from "./index.module.scss";

const Index = (): JSX.Element => {
    const [loading, setLoading] = useState(0);
    const [error, setError] = useState(null);
    const [scripts, setScripts] = useState(null);
    useEffect(() => {
        const fetchScripts = async () => {
            try {
                setLoading(1);
                const response = await axios.get("/api/scripts");
                console.log(response.data);
                if (response.data.error) throw response.data.error;
                setScripts(response.data);
                window.localStorage.setItem("recentScripts", JSON.stringify(response.data));
                window.localStorage.setItem("recentScriptsTime", new Date().valueOf().toString());
                setLoading(-1);
            } catch (error) {
                console.error(error);
                setError(error);
                setLoading(-1);
            }
        };

        const recentScriptsTime = Number(window.localStorage.getItem("recentScriptsTime"));
        if (recentScriptsTime) {
            const diff = new Date().valueOf() - recentScriptsTime;
            //update if it's been more than a day
            if (diff > 1000 * 60 * 60 * 24) fetchScripts();
            else {
                const cachedScripts = JSON.parse(window.localStorage.getItem("recentScripts"));
                setScripts(cachedScripts);
                setLoading(-1);
            }
        } else fetchScripts();
    }, []);

    useEffect(() => {
        if (window.innerWidth < 950) {
            alert(
                "ScriptAxis in in early development and doesn't yet support small displays.\n\nIf you are on your phone, try viewing the site in desktop mode, or viewing the site in landscape orientation."
            );
        }
    }, []);

    if (loading === 0) {
        return (
            <Layout>
                <Head>
                    <title>ScriptAxis | The Funscript Library (Work in Progress!)</title>
                </Head>
            </Layout>
        );
    }

    return (
        <Layout>
            <Head>
                <title>ScriptAxis | The Funscript Library (Work in Progress!)</title>
            </Head>
            {loading === 1 ? (
                <div className={style.indexLoading}>
                    <p>
                        <span>
                            <FaCog />
                        </span>
                        <span>Loading the latest scripts just for you...</span>
                    </p>
                </div>
            ) : error ? (
                <p style={{ color: "salmon" }}>{error}</p>
            ) : (
                <>
                    <h1>Recently added scripts</h1>
                    <ScriptGrid scripts={scripts} />
                </> //
            )}
        </Layout>
    );
};

// export async function getServerSideProps() {
//     let scripts = [];
//     try {
//         scripts = await FetchScripts();
//     } catch(error) {
//         console.log("Failed to get scripts", error);
//     } finally {
//         return {
//             props: {
//                 scripts
//             }
//         }
//     }
// }

export default Index;
