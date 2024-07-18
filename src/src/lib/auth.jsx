import { cookies } from "next/headers";

const TOKEN_MAX_AGE = process.env.TOKEN_MAX_AGE ? Number(process.env.TOKEN_MAX_AGE) : 360000000;
const AUTH_COOKIE_NAME = 'auth-token';
const REFRESH_TOKEN_COOKIE_NAME = 'auth-refresh-token';

export function getToken(){
    const token = cookies().get(AUTH_COOKIE_NAME);
    return token?.value;
}

export function getRefreshToken(){
    const refreshToken = cookies().get(REFRESH_TOKEN_COOKIE_NAME);
    return refreshToken?.value;
}

export function setToken(accessToken){
    return cookies().set({
        name: AUTH_COOKIE_NAME,
        value: accessToken,
        httpOnly: true, // limit client-side js
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
        maxAge: TOKEN_MAX_AGE,
    })
}

export function setRefreshToken(refreshToken){
    return cookies().set({
        name: REFRESH_TOKEN_COOKIE_NAME,
        value: refreshToken,
        httpOnly: true, // limit client-side js
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
        maxAge: TOKEN_MAX_AGE,
    })
}

export function deleteTokens(){
    cookies().delete(AUTH_COOKIE_NAME)
    return cookies().delete(REFRESH_TOKEN_COOKIE_NAME)
}