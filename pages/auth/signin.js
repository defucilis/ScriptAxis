import dynamic from 'next/dynamic'

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

import Layout from '../../components/layout/Layout'

import useUser from '../../utilities/auth/useUser'

const Home = () => {

    const {user, loginAndRedirect} = useUser();

    const handleSubmit = e => {

        const doLogin = async (email, password) => {
            const response = await loginAndRedirect(email, password, "/auth/home");
            console.log("Signed in", response);
        }

        e.preventDefault();
        doLogin(e.target.email.value, e.target.password.value);
    }

    return (
        <Layout>
            <h1>Sign In</h1>
            {
                user 
                ? (
                    <div>
                        <p>You are already signed in!</p>
                        <ReactJson src={user} />
                    </div>
                )
                : (
                    <div>
                        <form onSubmit={handleSubmit}>
                            <input id="email" />
                            <input type="password" id="password" />
                            <input type="submit" value="Sign In" />
                        </form>
                    </div>
                )
            }
        </Layout>
    )
}

export default Home;