import SignInForm from "components/forms/SignInForm";
import Layout from "components/layout/Layout";
import { GetServerSidePropsContext } from "next";
import { getCsrfToken } from "next-auth/client";

const SignIn = ({ csrfToken }: { csrfToken: string }): JSX.Element => {
    return (
        <Layout>
            <SignInForm csrfToken={csrfToken} />
        </Layout>
    );
};

export async function getServerSideProps(
    context: GetServerSidePropsContext
): Promise<{ props: { csrfToken: string } }> {
    const csrfToken = await getCsrfToken(context);
    return {
        props: { csrfToken },
    };
}

export default SignIn;
