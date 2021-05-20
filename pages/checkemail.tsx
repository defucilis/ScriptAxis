import Layout from "components/layout/Layout";

import style from "../components/forms/SignInForm.module.scss";

const CheckEmail = (): JSX.Element => {
    return (
        <Layout>
            <div className={style.form}>
                <h1>Check your email</h1>
                <p>A sign-in link has been sent to your email address</p>
            </div>
        </Layout>
    );
};

export default CheckEmail;
