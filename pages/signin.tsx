import SignInForm from "components/forms/SignInForm";
import Layout from "components/layout/Layout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getCsrfToken } from "next-auth/client";

const SignIn = ({ csrfToken }: { csrfToken: string }): JSX.Element => {
    return (
        <Layout>
            <SignInForm csrfToken={csrfToken} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (
    ctx: GetServerSidePropsContext
) => {
    const csrfToken = await getCsrfToken(ctx);
    return {
        props: { csrfToken },
    };
}

export default SignIn;
