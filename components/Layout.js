import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

const Layout = ({children, page}) => {
    return (
        <div>
            <Head>
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
            <Header page={page}/>
            <div className="content container">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout;