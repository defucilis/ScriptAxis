import Layout from '../../components/Layout'
import {useRouter} from 'next/router'
import ScriptUtils from '../../utilities/ScriptUtils'
import ScriptGrid from '../../components/ScriptGrid'
import Head from 'next/head'
import {FetchCreatorScripts} from '../api/scripts/creator'

const Creator = ({scripts}) => {

    const router = useRouter();
    const {creatorname} = router.query;

    return (
        <Layout page="creators">
         <Head>
                <title>ScriptAxis | {creatorname}</title>
            </Head>
            <h1>Creator {creatorname}</h1>
            <ScriptGrid scripts={scripts} />
        </Layout>
    )
}

export async function getServerSideProps({query}) {

    let scripts = [];
    try {
        scripts = await FetchCreatorScripts(query.creatorname);
    } catch(error) {
        console.log(error);
    } finally {
        return {
            props: {
                scripts: scripts
                            .map(doc => ScriptUtils.parseScriptDocument(doc))
                            .sort((a, b) => b.created - a.created)
            }
        }
    }
}

export default Creator;