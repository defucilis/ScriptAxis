import {useState, useEffect} from 'react'

import Head from 'next/head'

import axios from 'axios'

import Layout from '../components/layout/Layout'
import ScriptGrid from '../components/scripts/ScriptGrid'

import ScriptUtils from '../utilities/ScriptUtils'

const Index = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [scripts, setScripts] = useState(null);
    useEffect(() => {
        const fetchScripts = async () => {
            try {
                setLoading(true);
                const response = await axios.get("/api/scripts");
                console.log(response.data);
                if(response.data.error) throw response.data.error;
                setScripts(response.data.map(script => ScriptUtils.parseScriptDocument(script)));
                setLoading(false);
            } catch(error) {
                console.error(error);
                setError(error);
                setLoading(false);
            }
        }

        fetchScripts();
    }, [])
    

    useEffect(() => {
        if(window.innerWidth < 950) {
            alert("ScriptAxis in in early development and doesn't yet support small displays.\n\nIf you are on your phone, try viewing the site in desktop mode, or viewing the site in landscape orientation.");
        }
    }, [])

    return (
        <Layout>
            <Head>
                <title>ScriptAxis | The Funscript Library (Work in Progress!)</title>
            </Head>
            {
                loading ? (
                    <p>Loading the latest scripts just for you...</p>
                ) : error ? <p style={{color: "salmon"}}>{error}</p> : (
                    <>
                        <h1>Recently added scripts</h1>
                        <ScriptGrid scripts={scripts}/>
                    </>//
                )
            }
        </Layout>
    )
}

// export async function getServerSideProps() {
//     let scripts = [];
//     try {
//         scripts = await FetchScripts();
//     } catch(error) {
//         console.log("Failed to get scripts", error);        
//     } finally {
//         return {
//             props: {
//                 scripts : scripts.map(script => ScriptUtils.parseScriptDocument(script))
//             }
//         }
//     }
// }

export default Index;