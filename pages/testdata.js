import Head from 'next/head'
import Layout from '../components/Layout'
import {FetchSlugs} from './api/scripts/allslugs'
import AdminPanel from '../components/AdminPanel'

const TestData = ({existingScripts}) => {
    
    

    return (
        <Layout>
            <Head>
                <title>ScriptAxis | Admin Functions</title>
            </Head>
            <h1>Admin Functions</h1>
            <AdminPanel existingScripts={existingScripts}/>
        </Layout>
    )
}

export async function getServerSideProps({query}) {
    let scripts = [];
    try {
        scripts = await FetchSlugs();
    } catch(error) {
        console.log("Failed to load scripts", error);
    } finally {
        return {
            props: {
                existingScripts: scripts
            }
        }
    }
}

export default TestData;