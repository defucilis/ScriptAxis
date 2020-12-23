import {useState, useEffect} from 'react'
import Head from 'next/head'

import Layout from '../components/layout/Layout'
import CreatorGrid from '../components/creators/CreatorGrid'

import {FetchCreators} from './api/creators'

const Creators = ({creators}) => {

    

    return (
        <Layout page="creators">
            <Head>
                <title>ScriptAxis | Creators</title>
            </Head>
            <h1>All Creators</h1>
            <CreatorGrid creators={creators} />
        </Layout>
    )
}

export async function getServerSideProps({query}) {

    let creators = [];
    try {
        creators = await FetchCreators();
        creators = creators.map(creator => {
            return {
                ...creator,
                created: creator.created.valueOf(),
                modified: creator.modified.valueOf(),
            }
        })
    } catch(error) {
        console.error(error);
    } finally {
        return {
            props: { creators }
        }
    }
}

export default Creators;