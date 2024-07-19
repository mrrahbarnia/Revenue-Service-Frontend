"use client"
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext(null);

const LOGIN_REDIRECT_URL = "/";
const LOCAL_STORAGE_KEY = "user-logged-in";
const LOCAL_STORAGE_EMAIL_KEY = "email";

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState("");
    const router = useRouter();

    useEffect(() => {
        const storedAuthStatus = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedAuthStatus) {
            const storedAuthStatusInt = parseInt(storedAuthStatus);
            setIsAuthenticated(storedAuthStatusInt === 1);
        }
        const storedEmail = localStorage.getItem(LOCAL_STORAGE_EMAIL_KEY);
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, [])

    const login = (email) => {
        setIsAuthenticated(true);
        localStorage.setItem(LOCAL_STORAGE_KEY, "1");
        if (email) {
            localStorage.setItem(LOCAL_STORAGE_EMAIL_KEY, email);
            setEmail(email);
        }
        router.replace(LOGIN_REDIRECT_URL)
        // const nextUrl = searchParams.get('next');
        // const inValidNextUrls = ['/login', '/logout'];
        // const validNextUrl = nextUrl && nextUrl.startsWith('/') && !inValidNextUrls.includes(nextUrl);
        // if (validNextUrl) {
        //     router.replace(nextUrl)
        // } else {
        //     router.replace(LOGIN_REDIRECT_URL)
        // }
    }

    const unauthorizedRedirect = () => {
        localStorage.setItem(LOCAL_STORAGE_KEY, "0");
        localStorage.removeItem(LOCAL_STORAGE_EMAIL_KEY);
        setIsAuthenticated(false);
        return router.replace("/users/login/")
    }

    const checkAuthenticationState = () => {
        if (!isAuthenticated) {
            return unauthorizedRedirect();
        }
    }

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.setItem(LOCAL_STORAGE_KEY, "0");
        return localStorage.removeItem(LOCAL_STORAGE_EMAIL_KEY);
    }


    return <AuthContext.Provider value={
        {isAuthenticated, email,
        login, unauthorizedRedirect, logout,
        checkAuthenticationState, checkAuthenticationState}
    }>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext);
}

