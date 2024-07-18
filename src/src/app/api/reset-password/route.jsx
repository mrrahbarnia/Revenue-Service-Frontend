"use server"

import { NextResponse } from "next/server";
import { DJANGO_BASE_ENDPOINTS } from "@/config/defaults";

const RESET_PASSWORD_EXTERNAL_ENDPOINT = `${DJANGO_BASE_ENDPOINTS}/users/reset-password/`;

export async function POST(request) {
    const requestData = await request.json()

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    }
    const response = await fetch(RESET_PASSWORD_EXTERNAL_ENDPOINT, requestOptions);
    const jsonResponse = await response.json();
    if (response.ok) {
        return NextResponse.json({"verified": true}, {status: 200})
    }
    return NextResponse.json({...jsonResponse}, {status: 400})
};
