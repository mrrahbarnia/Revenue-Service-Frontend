"use client"
import { useState, useEffect, Fragment } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMessage } from "@/store/message-provider";
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

const RESET_PASSWORD_VERIFY_INTERNAL_ENDPOINT = '/api/reset-password/verify/'


export default function Page() {
    const message = useMessage();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [messageState, setMessageState] = useState(null);

    useEffect(() => {
        setMessageState(message.resetPassVerifyMessage);
        setTimeout(() => {
            setMessageState(null);
        }, 6000)
    }, message)

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

        const response = await fetch(RESET_PASSWORD_VERIFY_INTERNAL_ENDPOINT, requestOptions);

        let data = {};
        try {
            data = await response.json();
        } catch (error) {
        
        }
        if (response.ok) {
            // TODO: Login and navigate to change password
            router.replace('/change-password/');
        } else {
            if (data.detail === "Random password is invalid!(Expired or wrong)") {
                setError("رمز وارد شده یا اشتباه است یا منقضی شده است!لطفا رمز عبور جدید بگیرید.")
                event.target.password.value = '';
                setIsLoading(false);
                return;
            }
        }
    }

    const clickHandler = () => {
        router.replace("/reset-password/")
    }

    const alertTitle = messageState === "Random password sent." ? "رمز عبور موقت ارسال شد." : undefined;
    const alertDescription = messageState === "Random password sent." ? "بعد از وارد کردن رمز عبور موقت میتوانید رمز عبور خود را به دلخواه تغییر دهید" : undefined;

    return (
        <Fragment>
        {messageState && <AlertDemo 
            title={alertTitle}
            description={alertDescription} />
        }
        <Card className="mx-auto max-w-sm">
        <CardHeader>
            <CardTitle className="font-[Vazir-Medium] text-2xl">بازیابی رمز عبور</CardTitle>
            <CardDescription className="font-[Vazir-Medium]">
                رمز عبور ایمیل شده را وارد کنید.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid gap-4">
            <form onSubmit={formSubmitHandler} >
                <div className="grid gap-2">
                    <Label className="font-[Vazir-Medium]" htmlFor="password">رمز عبور ایمیل شده</Label>
                    <Input
                    id="password"
                    type="password"
                    name="password"
                    required
                    className="[direction:ltr]"
                    />
                </div>
                {error ? <p className="mt-2 w-full font-[Vazir-Medium] text-red-700">{error}</p> : undefined}
                <Button disabled={isLoading} type="submit" className="bg-purple-800 mt-2 w-full font-[Vazir-Medium]">
                    {isLoading ? "صبر کنید" : "تأیید" }
                </Button>
                <Button onClick={clickHandler} type="button" className="bg-purple-800 mt-2 w-full font-[Vazir-Medium]">
                    رمز عبور جدید
                </Button>
            </form>
            </div>
        </CardContent>
        </Card>
    </Fragment>
    )
}