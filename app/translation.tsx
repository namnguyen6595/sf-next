"use client";

import { createContext } from 'react';

type TranslateProps = {
    lng: string;
    locales: { [key: string]: any };
    children: any
}

interface ITranslateContext {
    t: (path: string) => void
    locale: {[key: string]: any}
    lang: string
}

// import other dependencies as needed
export const TranslationContext = createContext<ITranslateContext>({} as ITranslateContext);

const TranslationContextProvider = (props: TranslateProps) => {
    const { lng, locales, children } = props

    const t = (path: string) => {
        const data = path.split('.')
        return data
     }

    return (
        <TranslationContext.Provider value={{
            t: t,
            locale: locales,
            lang: lng
        }}>
            {children}
        </TranslationContext.Provider>

    )
}// Replace string with the appropriate type for your translation data

export default TranslationContextProvider;