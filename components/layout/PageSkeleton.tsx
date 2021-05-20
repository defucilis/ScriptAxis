import Layout from "./Layout";

const PageSkeleton = ({ message }: { message: string }): JSX.Element => {
    return (
        <Layout>
            <h1>{message}</h1>
        </Layout>
    );
};

export default PageSkeleton;
