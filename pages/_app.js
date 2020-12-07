import firebase from '../utilities/Firebase'
import "@yaireo/tagify/dist/tagify.css"
import './index.css'
import Router from "next/router";
import {useState, useEffect} from 'react'
import AuthManager from '../components/AuthManager'

const App = ({Component, pageProps}) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const startLoad = () => setLoading(true);
        const endLoad = () => setLoading(false);
        Router.events.on("routeChangeStart", startLoad);
        Router.events.on("routeChangeComplete", endLoad);
        Router.events.on("routeChangeError", endLoad);
        return () => {
            Router.events.off("routeChangeStart", startLoad);
            Router.events.off("routeChangeComplete", endLoad);
            Router.events.off("routeChangeError", endLoad);
        }
    }, []);

    return (
        <>
            <div className={`loader top ${loading ? "loadingtop" : "notloadingtop"}`}></div>
            <div className={`loader bottom ${loading ? "loadingbottom" : "notloadingbottom"}`}></div>
            <AuthManager>
                <Component {...pageProps} />
            </AuthManager>
        </>
    )
}

export default App;