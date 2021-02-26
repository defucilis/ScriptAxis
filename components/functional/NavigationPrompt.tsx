// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect } from "react";
import SingletonRouter, { Router } from "next/router";


const NavigationPrompt = ({ when, message }: {when: boolean, message: string}): JSX.Element => {
    useEffect(() => {
        SingletonRouter.router.change = (...args) => {
            if (!when) return Router.prototype.change.apply(SingletonRouter.router, args);
            return confirm(message)
                ? Router.prototype.change.apply(SingletonRouter.router, args)
                : new Promise((resolve) => resolve(false));
        };

        return () => {
            delete SingletonRouter.router.change;
        };
    }, []);

    return null;
};

export default NavigationPrompt;
