"use client"
import React, { createContext, useContext, useEffect } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/app/firebase/firebase";

const AuthContext = createContext({
    user: null,
    adminAccessToken: null,
    loading: true,
    error: null,
    login: async () => { },
    logout: async () => { },
});

export const AuthUserProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);
    const [adminAccessToken, setAdminAccessToken] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            // Check for existing token in localStorage on initial load
            const token = localStorage.getItem('adminAuthToken');
            if (token) {
                setAdminAccessToken(token);
                // Set user based on token if available (optional)
                // You might need to fetch additional user data from the server
            }
        }, (err) => {
            setError(err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            setError(null); // Clear any previous errors
            localStorage.setItem('adminAuthToken', userCredential?.user?.accessToken);
            const token = localStorage.getItem('adminAuthToken');
            if (token) {
                setAdminAccessToken(token);
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            localStorage.removeItem('adminAuthToken');
            setAdminAccessToken(null);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, logout, adminAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;