import Router from "next/router";

import "@yaireo/tagify/dist/tagify.css";
import "react-datepicker/dist/react-datepicker.css";

import { initFirebase } from "../lib/initFirebase";

import { AuthProvider } from "../lib/auth/useUser";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

import "../styles/app.scss";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const App = ({ Component, pageProps }) => {
    initFirebase();
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
};

export default App;
