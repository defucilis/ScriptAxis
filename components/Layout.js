import Header from './Header'
import Footer from './Footer'

const Layout = ({children, page}) => {
    return (
        <div>
            <Header page={page}/>
            <div className="content container">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout;