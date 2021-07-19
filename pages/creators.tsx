import Head from "next/head";

import Layout from "../components/layout/Layout";
import CreatorGrid from "../components/creators/CreatorGrid";

import { FetchCreators } from "./api/creators";
import { Creator } from "lib/types";
import { GetServerSideProps } from "next";

const Creators = ({ creators }: { creators: Creator[] }): JSX.Element => {
    return (
        <Layout page="creators">
            <Head>
                <title>ScriptAxis | Creators</title>
            </Head>
            <h1>All Creators</h1>
            <CreatorGrid creators={creators} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    let creators = [];
    try {
        creators = await FetchCreators();
    } catch (error) {
        console.error(error);
    }
    return {
        props: { creators },
    };
};

export default Creators;
