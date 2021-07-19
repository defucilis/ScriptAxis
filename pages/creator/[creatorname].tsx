import { useRouter } from "next/router";
import Head from "next/head";

import Layout from "../../components/layout/Layout";
import CreatorDetail from "../../components/creators/CreatorDetail";

import { FetchCreator } from "../api/creator/[creatorName]";
import { UiCreator } from "lib/types";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

const Creator = ({ creator }: { creator: UiCreator }): JSX.Element => {
    const router = useRouter();
    const { creatorname } = router.query;

    return (
        <Layout page="creators">
            <Head>
                <title>ScriptAxis | {creatorname}</title>
            </Head>
            <CreatorDetail creator={creator} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    let creator: UiCreator = null;
    try {
        creator = await FetchCreator(String(ctx.query.creatorname));
    } catch (error) {
        console.error(error);
        return {
            notFound: true,
        };
    }

    if (!creator) {
        return {
            notFound: true,
        };
    }

    if (creator.scripts && creator.scripts.length > 0) {
        creator.scripts = creator.scripts.sort(
            (a, b) => b.createdAt.valueOf() - a.createdAt.valueOf()
        );
    }
    return {
        props: { creator },
    };
};

export default Creator;
