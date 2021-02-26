import Head from "next/head";
import Layout from "./Layout";
import { FaCog } from "react-icons/fa";
import style from "pages/index.module.scss";

const LoadingSkeleton = (): JSX.Element => {
    return (
        <Layout>
            <Head>
                <title>ScriptAxis | Loading</title>
            </Head>
            <div className={style.indexLoading}>
                <p>
                    <span>
                        <FaCog />
                    </span>
                    <span>{`Making sure you're logged in...`}</span>
                </p>
            </div>
        </Layout>
    );
};

export default LoadingSkeleton;
