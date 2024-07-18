import ApiProxy from "../proxy";
import { NextResponse } from "next/server";
import { DJANGO_BASE_ENDPOINTS } from "@/config/defaults";

const CHANGE_PASSWORD_EXTERNAL_ENDPOINT = `${DJANGO_BASE_ENDPOINTS}/users/change-password/`;


export async function POST(request) {
    const requestData = await request.json()
    const requiredObject = {
        old_password: requestData["old-password"],
        new_password: requestData["new-password"],
        confirm_password: requestData["confirm-password"]
    }
    const {data, status} = await ApiProxy.post(CHANGE_PASSWORD_EXTERNAL_ENDPOINT, requiredObject)
    console.log(data);
    console.log(status);
    return NextResponse.json(data, {status: status})
}   