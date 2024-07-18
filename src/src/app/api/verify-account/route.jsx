"use server"

import { NextResponse } from "next/server";
import { DJANGO_BASE_ENDPOINTS } from "@/config/defaults";

const VERIFY_ACCOUNT_EXTERNAL_ENDPOINT = `${DJANGO_BASE_ENDPOINTS}/users/verify-account/`;

export async function POST(request) {
    const requestData = await request.json()

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            verification_code: requestData['verification-code']
        })
    }
    const response = await fetch(VERIFY_ACCOUNT_EXTERNAL_ENDPOINT, requestOptions);
    const jsonResponse = await response.json();
    if (response.ok) {
        return NextResponse.json({"verified": true}, {status: 200})
    }
    return NextResponse.json({...jsonResponse}, {status: 400})
};