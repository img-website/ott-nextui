"use client"
import { createContext, useContext, useEffect, useState } from "react"
const AppContext = createContext(null);

export function AppWrapper({children}) {
    let accessToken = null;
    if (typeof window !== 'undefined') {
    accessToken = localStorage.getItem("token");
    }
    const [credential, setCredential] = useState({
        accessToken: null,
        uid: null,
        email: null,
        isAdmin: false,
        displayName: null,
        emailVerified: null,
        isAnonymous: null,
        phoneNumber: null,
        photoURL: null
    });
    
    
	const [isNabarCollapsed, setIsNavbarCollapsed] = useState(false);
	const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);

	const toggleNavbar = () => {
		setIsNavbarCollapsed(!isNabarCollapsed);
	};

	const toggleSearchInput = () => {
		setIsSearchInputVisible(!isSearchInputVisible);
	};

    useEffect(() => {
        if (accessToken) {
            setCredential( prev => {
                return {
                    ...prev,
                    accessToken: accessToken
                }
            });
        }
    }, [accessToken]);

    return (
        <AppContext.Provider value={{credential, setCredential, isNabarCollapsed, isSearchInputVisible, toggleNavbar, toggleSearchInput}} >
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext);
}