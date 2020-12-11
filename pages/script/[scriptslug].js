import Layout from '../../components/Layout'
import ScriptUtils from '../../utilities/ScriptUtils'
import ScriptDetails from '../../components/ScriptDetails'
import Head from 'next/head'
import {FetchScript} from '../api/scripts/slug'

const Script = ({script}) => {

    return (
        <Layout page="scripts">
            <Head>
                <title>ScriptAxis | {script.name}</title>
            </Head>
            <ScriptDetails script={script} />
        </Layout>
    )
}

export async function getServerSideProps({query,res}) {
    let script = null;
    try {
        script = await FetchScript(query.scriptslug);
        script = ScriptUtils.parseScriptDocument(script);
    } catch(error) {
        console.error(error);
    } finally {
        return {
            props: {
                script
            }
        }
    }
}

export default Script;