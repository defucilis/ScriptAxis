import Head from 'next/head'

import Layout from '../components/layout/Layout'
import AdminPanel from '../components/dashboard/AdminPanel'

import {FetchSlugs} from './api/scripts/allslugs'

import useUser from '../utilities/auth/useUser'

const Admin = ({existingScripts}) => {
    
    const {user} = useUser({redirectIfNotAdmin: "/"});

    return (
        <Layout>
            <Head>
                <title>ScriptAxis | Admin Functions</title>
            </Head>
            <h1>Admin Functions</h1>
            <AdminPanel user={user} existingScripts={existingScripts}/>
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

export default Admin;