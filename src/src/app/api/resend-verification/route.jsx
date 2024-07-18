"use server"

import { NextResponse } from "next/server";
import { DJANGO_BASE_ENDPOINTS } from "@/config/defaults";

const RESEND_VERIFICATION_EXTERNAL_ENDPOINT = `${DJANGO_BASE_ENDPOINTS}/users/resend-verification/`;

export async function POST(request) {
    const requestData = await request.json()

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    }
    const response = await fetch(RESEND_VERIFICATION_EXTERNAL_ENDPOINT, requestOptions);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    if (response.ok) {
        return NextResponse.json({"verified": true}, {status: 200})
    }
    return NextResponse.json({...jsonResponse}, {status: 400})
};
