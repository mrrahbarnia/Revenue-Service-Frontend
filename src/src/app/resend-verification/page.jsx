"use client"
import { useState } from "react";
import { emailIsValid } from "@/lib/utils";
import { useMessage } from "@/store/message-provider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RESEND_VERIFICATION_INTERNAL_ENDPOINT = '/api/resend-verification/'


export default function Page() {
    const message = useMessage();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const formSubmitHandler = async(event) => {
        setIsLoading(true);
        event.preventDefault();
        const formData = new FormData(event.target);
        const objFromForm = Object.fromEntries(formData);
        const jsonData = JSON.stringify(objFromForm);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        }

        if (!emailIsValid(event.target.email.value)) {
            setError("فرمت ایمیل وارد شده صحیح نیست.");
            setIsLoading(false);
            return;
        }

        const response = await fetch(RESEND_VERIFICATION_INTERNAL_ENDPOINT, requestOptions);

        let data = {};
        try {
            data = await response.json();
        } catch (error) {

        }
        if (response.ok) {
            message.messageVerifyAcc("Email resent successfully");
            router.replace('/verify-account/');
        } else {
            if (data.detail === 'User has already been verified!') {
                setError("ایمیل وارد شده قبلا تأیید شده است.")
                event.target.email.value = '';
                setIsLoading(false);
                return;
            }
            if (data.detail === 'Not active account found!') {
                setError("حساب کاربری با ایمیل وارد شده یافت نشد.")
                event.target.email.value = '';
                setIsLoading(false);
                return;
            }
        }
    }

    return (
        <Card className="mx-auto max-w-sm">
        <CardHeader>
            <CardTitle className="font-[Vazir-Medium] text-2xl">ارسال دوباره ایمیل</CardTitle>
            <CardDescription className="font-[Vazir-Medium]">
                ایمیلی که با آن ثبت نام کردید را وارد کنید.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid gap-4">
            <form onSubmit={formSubmitHandler} >
                <div className="grid gap-2">
                    <Label className="font-[Vazir-Medium]" htmlFor="email">ایمیل</Label>
                    <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="user@example.com"
                    required
                    className="[direction:ltr]"
                    />
                </div>
                {error ? <p className="mt-2 w-full font-[Vazir-Medium] text-red-700">{error}</p> : undefined}
                <Button disabled={isLoading} type="submit" className="mt-2 w-full font-[Vazir-Medium]">
                    {isLoading ? "صبر کنید" : "ارسال" }
                </Button>
            </form>
            </div>
        </CardContent>
        </Card>
    )
}