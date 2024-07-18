"use server"

import { setToken, setRefreshToken } from "@/lib/auth";
import { NextResponse } from "next/server";
import { DJANGO_BASE_ENDPOINTS } from "@/config/defaults";

const LOGIN_EXTERNAL_ENDPOINT = `${DJANGO_BASE_ENDPOINTS}/users/login/`;

export async function POST(request) {
    const requestData = await request.json()

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    }
    const response = await fetch(LOGIN_EXTERNAL_ENDPOINT, requestOptions);
    const jsonResponse = await response.json();

    if (response.ok) {
        const {email, access, refresh} = jsonResponse
        setToken(access);
        setRefreshToken(refresh);
        return NextResponse.json({"loggedIn": true, "email": email}, {status: 200})
    }

    return NextResponse.json({"loggedIn": false, ...jsonResponse}, {status: 400})
};