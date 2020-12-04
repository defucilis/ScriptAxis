import Header from './Header'

const Layout = ({children}) => {
    return (
        <div>
            <Header />
            <div className="container">
                {children}
            </div>
        </div>
    )
}

export default Layout;