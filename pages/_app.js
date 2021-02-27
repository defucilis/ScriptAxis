import Router from "next/router";

import "@yaireo/tagify/dist/tagify.css";
import "react-datepicker/dist/react-datepicker.css";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { initFirebase } from "../lib/initFirebase";
import { AuthProvider } from "../lib/auth/useAuth";

import MaintenanceMode from '../components/layout/MaintenanceMode'

import "../styles/app.scss";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const App = ({ Component, pageProps }) => {

    console.log(process.env.NEXT_PUBLIC_MAINTENANCE_MODE);
    if(process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true") {
        return (
            <MaintenanceMode />
        )
    }

    initFirebase();
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
};

export default App;
