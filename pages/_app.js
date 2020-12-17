import {useState, useEffect} from 'react'
import Router from "next/router";

import "@yaireo/tagify/dist/tagify.css"
import "react-datepicker/dist/react-datepicker.css";

import initFirebase from '../utilities/initFirebase'

import './index.css'

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
        
        initFirebase();
    }, []);

    return (
        <>
            <div className={`loader top ${loading ? "loadingtop" : "notloadingtop"}`}></div>
            <div className={`loader bottom ${loading ? "loadingbottom" : "notloadingbottom"}`}></div>
            <Component {...pageProps} />
        </>
    )
}

export default App;