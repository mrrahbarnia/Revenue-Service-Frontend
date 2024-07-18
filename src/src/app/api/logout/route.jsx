"use server"

import { deleteTokens } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    deleteTokens();
    return NextResponse.json({"loggedOut": true}, {status: 200})
};