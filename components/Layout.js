import Header from './Header'

const Layout = ({children, page}) => {
    return (
        <div>
            <Header page={page}/>
            <div className="container">
                {children}
            </div>
        </div>
    )
}

export default Layout;