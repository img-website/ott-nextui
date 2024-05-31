"use client"
import { createContext, useContext, useEffect, useState } from "react"
const LoadingContext = createContext(null);

export function LoadingWrapper({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const [loadingText, setLoadingText] = useState("Loading UI...");
    const [trySignin, setTrySignin] = useState(false);

    useEffect(() => {
        if (trySignin == "true") {
            setIsLoading(true);
            setLoadingText("Getting User Details...")
        }
    }, [trySignin])

    useEffect(() => {
        // if (typeof window !== 'undefined') {
            setTrySignin(localStorage.getItem("try_signin"));
        // }
    }, [])

    useEffect(() => {
        setIsLoading(false);
        setLoadingText("")
    }, [])

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading, loadingText, setLoadingText }} >
            {children}
        </LoadingContext.Provider>
    )
}

export function useLoadingContext() {
    return useContext(LoadingContext);
}