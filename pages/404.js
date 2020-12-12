import Head from 'next/head'

import Layout from '../components/layout/Layout'

const NotFound = () => {
    return (
        <Layout>
            <Head>
                <title>ScriptAxis | Page Not Found</title>
            </Head>
            <div style={{minHeight: "calc(100vh - 200px)", display: "grid", placeItems: "center"}}>
                <h2 style={{marginBottom: "0.5em"}}>The page you requested was not found</h2>
            </div>
        </Layout>
    )
}

export default NotFound;