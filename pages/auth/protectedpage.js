import Layout from '../../components/layout/Layout'

import useUser from '../../utilities/auth/useUser'

const ProtectedPage = () => {

    const {user} = useUser({redirectTo: "/auth/home"});

    return (
        <Layout>
            <h1>Home</h1>
            {
                user 
                ? (
                    <div>
                        <p>Signed in as user {user.email}</p>
                    </div>
                )
                : (
                    <div>
                        <p>You are not signed in</p>
                    </div>
                )
            }
        </Layout>
    )
}

export default ProtectedPage;