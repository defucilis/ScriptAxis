import {useState, useEffect} from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import ScriptUtils from '../utilities/ScriptUtils'
import ScriptGrid from '../components/ScriptGrid'
import Head from 'next/head'

const Scripts = ({propScripts}) => {

    const [scripts, setScripts] = useState([]);
    useEffect(() => {
        setScripts(propScripts);
    }, [propScripts])

    return (
        <Layout page="scripts">
         <Head>
                <title>ScriptAxis | Scripts</title>
            </Head>
            <h1>Scripts</h1>
            <ScriptGrid scripts={scripts} />
        </Layout>
    )
}

export async function getServerSideProps() {
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
            }]
        }
    });
    let scripts = res.data.map(script => ScriptUtils.parseScriptDocument(script.document));
    return {
        props: {
            propScripts: [...scripts]
        }
    }
}

export default Scripts;