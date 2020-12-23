import {useRouter} from 'next/router'
import Head from 'next/head'

import Layout from '../../components/layout/Layout'
import CreatorDetail from '../../components/creators/CreatorDetail'

import ScriptUtils from '../../utilities/ScriptUtils'
import {FetchCreator} from '../api/creator/name'

const Creator = ({creator}) => {

    const router = useRouter();
    const {creatorname} = router.query;

    return (
        <Layout page="creators">
         <Head>
            <title>ScriptAxis | {creatorname}</title>
            </Head>
            <CreatorDetail creator={creator}/>
        </Layout>
    )
}

export async function getServerSideProps({query}) {

    let creator = [];
    try {
        creator = await FetchCreator(query.creatorname);
        creator.created = creator.created.valueOf();
        creator.modified = creator.modified.valueOf();
        console.log(creator);
    } catch(error) {
        console.error(error);
    } finally {
        if(creator.scripts && creator.scripts.length > 0) {
            creator.scripts = creator.scripts
            .map(doc => ScriptUtils.parseScriptDocument(doc))
            .sort((a, b) => b.created - a.created)
        }
        return {
            props: { creator }
        }
    }
}

export default Creator;