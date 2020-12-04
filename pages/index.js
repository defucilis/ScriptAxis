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
            <h2 style={{marginBottom: "0.5em"}}>Recently added scripts</h2>
            <ScriptGrid scripts={scripts}/>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    const res = await axios.post(`https://firestore.googleapis.com/v1/projects/scriptlibrary-8f879/databases/(default)/documents/:runQuery`, {
        structuredQuery : {
            from: [{
                collectionId: "scripts"
            }],
            orderBy: [{
                field: {
                    fieldPath: "created"
                },
                direction: "DESCENDING"
            }],
            limit: 12
        }
    });
    let scripts = res.data;
    console.log(scripts);
    scripts = scripts.map(script => ScriptUtils.parseScriptDocument(script.document));
    return {
        props: {
            scripts
        }
    }
}

export default Index;