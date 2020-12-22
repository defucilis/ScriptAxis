import dynamic from 'next/dynamic'

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

import Layout from '../../components/layout/Layout'

import useUser from '../../utilities/auth/useUser'

const Home = () => {

    const {user, logout} = useUser();

    return (
        <Layout>
            <h1>Home</h1>
            {
                user 
                ? (
                    <div>
                        <p>You are signed in!</p>
                        <button onClick={logout}>Sign Out</button>
                        <ReactJson src={user} theme="monokai" displayObjectSize={false} displayDataTypes={false} enableClipboard={false}  />
                    </div>
                )
                : (
                    <div>
                        <p>You are not signed in</p>
                        <a href="/auth/signin">Sign In</a>
                    </div>
                )
            }
        </Layout>
    )
}

export default Home;