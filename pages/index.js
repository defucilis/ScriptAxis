import Layout from '../components/Layout'
import ScriptGrid from '../components/ScriptGrid'
import axios from 'axios'
import ScriptUtils from '../utilities/ScriptUtils'
import Head from 'next/head'

const Index = ({scripts}) => {
    return (
        <Layout>
            <Head>
                <title>ScriptAxis | The Funscript Library (Work in Progress!)</title>
            </Head>
            <ScriptGrid scripts={scripts}/>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    const res = await axios.get(`https://firestore.googleapis.com/v1/projects/scriptlibrary-8f879/databases/(default)/documents/scripts`);
    let scripts = res.data;
    scripts = scripts.documents.map(script => ScriptUtils.parseScriptDocument(script));
    return {
        props: {
            scripts
        }
    }
}

export default Index;