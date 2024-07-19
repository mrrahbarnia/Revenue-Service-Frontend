"use client"
import { useState, useEffect, Fragment } from "react";
import { Button } from "@/components/ui/button";
import { useMessage } from "@/store/message-provider";
import { useRouter } from "next/navigation";
import { AlertDemo } from "@/components/Allert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const VERIFY_ACCOUNT_INTERNAL_ENDPOINT = '/api/verify-account/'



export default function Page() {
    const message = useMessage();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [messageState, setMessageState] = useState(null);

    useEffect(() => {
        setMessageState(message.verifyAccountMessage);
        setTimeout(() => {
            setMessageState(null);
        }, 6000)
    }, message)

    const resendCodeHandler = () => {
        router.replace("/users/resend-verification/")
    }

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

        const response = await fetch(VERIFY_ACCOUNT_INTERNAL_ENDPOINT, requestOptions);

        let data = {};
        try {
            data = await response.json();
        } catch (error) {

        }
        if (response.ok) {
            message.messageLogin("Account verified...Login please");
            router.replace('/users/login/');
        } else {
            setError("کد تأییدیه معتبر نمیباشد,کد جدید بگیرید.")
            event.target['verification-code'].value = '';
            setIsLoading(false);
            return;
        }
    }

    const alertTitle = messageState === "Registered Successfully" ? "با موفقیت ثبت نام شدید" : messageState === "Email resent successfully" ? "ایمیل با موفقیت ارسال شد" : undefined;
    const alertDescription = messageState === "Registered Successfully" ? "لطفا کد تأییدیه ایمیل شده را وارد کنید." : messageState === "Email resent successfully" ? "لطفا کد تأییدیه ایمیل شده را وارد کنید." : undefined;

    return (
    <Fragment>
        {messageState && <AlertDemo 
            title={alertTitle}
            description={alertDescription} />
        }
        <Card className="mx-auto max-w-sm">
        <CardHeader>
            <CardTitle className="font-[Vazir-Medium] text-2xl">تأیید حساب کاربری</CardTitle>
            <CardDescription className="font-[Vazir-Medium]">
                کد تأییدیه ایمیل شده را وارد کنید
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid gap-4">
            <form onSubmit={formSubmitHandler} >
                <div className="grid gap-2">
                    <Label className="font-[Vazir-Medium]" htmlFor="verification-code">کد تأییدیه</Label>
                    <Input
                    id="verification-code"
                    type="text"
                    name="verification-code"
                    required
                    className="[direction:ltr]"
                    />
                </div>
                {error ? <p className="mt-2 w-full font-[Vazir-Medium] text-red-700">{error}</p> : undefined}
                <Button disabled={isLoading} type="submit" className="bg-purple-800 mt-2 w-full font-[Vazir-Medium]">
                    {isLoading ? "صبر کنید" : "تأیید" }
                </Button>
                <Button onClick={resendCodeHandler} type="button" className="bg-purple-800 mt-2 w-full font-[Vazir-Medium]">
                    ارسال دوباره
                </Button>
            </form>
            </div>
        </CardContent>
        </Card>
    </Fragment>
    )
}