import style from "./SignInForm.module.scss";

const SignInForm = ({ csrfToken }: { csrfToken: string }): JSX.Element => {
    return (
        <div className={style.form}>
            <div>
                <h1>Sign In</h1>
                <p>If you do not already have an account, this will create one for you</p>
                <form method="post" action="/api/auth/signin/email">
                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" name="email" />
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default SignInForm;
