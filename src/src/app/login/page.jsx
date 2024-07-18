"use client"
import { useState, useEffect, Fragment } from "react";
import { emailIsValid } from "@/lib/utils";
import { useAuth } from "@/store/auth-provider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertDemo } from "@/components/Allert";
import { useMessage } from "@/store/message-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LOGIN_INTERNAL_ENDPOINT = '/api/login/'



export default function Page() {
    const message = useMessage();
    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [messageState, setMessageState] = useState(null);

    useEffect(() => {
        setMessageState(message.loginMessage);
        setTimeout(() => {
            setMessageState(null);
        }, 6000)
    }, message)

    const formSubmitHandler = async(event) => {
        setIsLoading(true);
        event.preventDefault();
        if (!emailIsValid(event.target.email.value)) {
            setError("فرمت ایمیل وارد شده صحیح نیست.");
            setIsLoading(false);
            return;
        }
        if (event.target.password.value.length < 8) {
            setError("رمز عبور وارد شده بسیار کوتاه است.")
            setIsLoading(false);
            return;
        }
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

        const response = await fetch(LOGIN_INTERNAL_ENDPOINT, requestOptions);

        let data = {};
        try {
            data = await response.json();
        } catch (error) {

        }
        if (response.ok) {
            console.log('LoggedIn');
            setIsLoading(false);
            auth.login(data?.email);
        } else {
            setError('حساب فعالی با اطلاعات داده شده وجود ندارد.');
            setIsLoading(false);
            return;
        }
    }

    const alertTitle = messageState === "Account verified...Login please" ? "اکانت شما با موفقیت فعال شد" : "Password Changed Successfully." ? "رمز عبور با  موفقیت تغییر کرد" : undefined;
    const alertDescription = messageState === "Account verified...Login please" ? "لطفا وارد شوید." : "Password Changed Successfully." ? "لطفا با رمز عبور جدید وارد شوید." : undefined;



    return (
        <Fragment>
        {messageState && <AlertDemo 
            title={alertTitle}
            description={alertDescription} />
        }
        <Card className="mx-auto max-w-sm">
        <CardHeader>
            <CardTitle className="font-[Vazir-Medium] text-2xl">صفحه ورود</CardTitle>
            <CardDescription className="font-[Vazir-Medium]">
            با ایمیل یا حساب گوگل خورد وارد شوید
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
                <div className="grid gap-2 mt-2">
                    <div className="flex gap-16 items-center">
                    <Label className="font-[Vazir-Medium]" htmlFor="password">رمز عبور</Label>
                    <Link href="/reset-password/" className="font-[Vazir-Medium] ml-auto inline-block text-sm underline">
                        رمز عبور خود را فراموش کرده اید؟
                    </Link>
                    </div>
                    <Input id="password" name="password" type="password" required className="[direction:ltr]" />
                </div>
                {error ? <p className="mt-2 w-full font-[Vazir-Medium] text-red-700">{error}</p> : undefined}
                <Button disabled={isLoading} type="submit" className="bg-purple-800 mt-2 w-full font-[Vazir-Medium]">
                    {isLoading ? "صبر کنید" : "ورود" }
                </Button>
            </form>
            <Button className="bg-purple-800 w-full font-[Vazir-Medium]">
                ورود با حساب گوگل
            </Button>
            </div>
            <div className="mt-4 text-center text-sm font-[Vazir-Medium]">
            حساب کاربری ندارید؟
            <Link href="/register/" className="underline">
                ثبت نام
            </Link>
            </div>
        </CardContent>
        </Card>
    </Fragment>
    )
}
