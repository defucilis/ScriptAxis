import Layout from '../../components/Layout'
import {useRouter} from 'next/router'
import axios from 'axios'
import ScriptUtils from '../../utilities/ScriptUtils'
import ScriptGrid from '../../components/ScriptGrid'
import Head from 'next/head'

const Author = ({scripts}) => {

    const router = useRouter();
    const {authorname} = router.query;

    return (
        <Layout page="authors">
         <Head>
                <title>ScriptAxis | {authorname}</title>
            </Head>
            <h1>Author {authorname}</h1>
            <ScriptGrid scripts={scripts} />
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
                        fieldPath: "author"
                    },
                    op: "EQUAL",
                    value: {
                        stringValue: query.authorname
                    }
                }
            }
        }
    });
    let authorScripts = res.data.map(script => ScriptUtils.parseScriptDocument(script.document));
    return {
        props: {
            scripts: [...authorScripts]
        }
    }
}

export default Author;