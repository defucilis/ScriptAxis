import Head from "next/head";
import Image from "next/image";
import style from "pages/index.module.scss";

const LoadingSkeleton = (): JSX.Element => {
    return (
        <div>
            <Head>
                <title>ScriptAxis | Maintenance</title>
            </Head>
            <div className={style.indexCenter}>
                <p>
                    <Image
                        src="/img/script-axis-512.png"
                        alt="Script Axis logo"
                        width="360"
                        height="90"
                    />
                    <span
                        style={{ width: "30%", marginLeft: "35%" }}
                    >{`I'm doing some work on the database right now, check back tomorrow!`}</span>
                </p>
            </div>
        </div>
    );
};

export default LoadingSkeleton;
