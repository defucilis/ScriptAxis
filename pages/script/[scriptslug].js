import Layout from '../../components/Layout'
import axios from 'axios'
import ScriptUtils from '../../utilities/ScriptUtils'
import ScriptDetails from '../../components/ScriptDetails'
import Head from 'next/head'

const Script = ({script}) => {

    return (
        <Layout>
            <Head>
                <title>ScriptAxis | {script.name}</title>
            </Head>
            <ScriptDetails script={script} />
        </Layout>
    )
}

export async function getServerSideProps({query}) {
    const res = await axios.post(`https://firestore.googleapis.com/v1/projects/scriptlibrary-8f879/databases/(default)/documents/:runQuery`, {
        structuredQuery : {
            from: [{
                collectionId: "scripts"
            }],
            where: {
                fieldFilter: {
                    field: {
                        fieldPath: "slug"
                    },
                    op: "EQUAL",
                    value: {
                        stringValue: query.scriptslug
                    }
                }
            }
        }
    });
    let foundScripts = res.data.map(script => ScriptUtils.parseScriptDocument(script.document));
    return {
        props: {
            script : foundScripts && foundScripts.length > 0 ? foundScripts[0] : null
        }
    }
}

export default Script;