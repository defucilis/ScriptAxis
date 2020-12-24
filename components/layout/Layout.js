import Head from 'next/head'
import Header from './Header'
import TopBar from './TopBar'
import Footer from './Footer'

const Layout = ({children, page}) => {
    return (
        <div>
            <Head>
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
            <TopBar />
            <Header page={page}/>
            <div className="content container">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout;