import {useEffect} from 'react'
import SingletonRouter, {Router} from 'next/router'

const NavigationPrompt = ({when, message}) => {
    useEffect(() => {
        SingletonRouter.router.change = (...args) => {
            if(!when) return Router.prototype.change.apply(SingletonRouter.router, args);
            return confirm(message)
                ? Router.prototype.change.apply(SingletonRouter.router, args)
                : new Promise((resolve, reject) => resolve(false));
        }

        return () => {
            delete SingletonRouter.router.change
        }
    }, [])

    return null;
}

export default NavigationPrompt;