import Head from 'next/head'

import Layout from '../components/layout/Layout'
import ScriptGrid from '../components/scripts/ScriptGrid'

import ScriptUtils from '../utilities/ScriptUtils'
import {FetchScripts} from './api/scripts'

const Index = ({scripts}) => {
    return (
        <Layout>
            <Head>
                <title>ScriptAxis | The Funscript Library (Work in Progress!)</title>
            </Head>
            <h1>Recently added scripts</h1>
            <ScriptGrid scripts={scripts}/>
        </Layout>
    )
}

export async function getServerSideProps() {
    let scripts = [];
    try {
        scripts = await FetchScripts();
    } catch(error) {
        console.log("Failed to get scripts", error);        
    } finally {
        return {
            props: {
                scripts : scripts.map(script => ScriptUtils.parseScriptDocument(script))
            }
        }
    }
}

export default Index;