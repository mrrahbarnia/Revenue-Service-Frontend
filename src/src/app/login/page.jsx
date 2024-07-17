"use client"
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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

export default function LoginForm() {
    const [error, setError] = useState(null);

    const formSubmitHandler = async(event) => {
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

        const response = await fetch(LOGIN_INTERNAL_ENDPOINT, requestOptions);

        let data = {};
        try {
            data = await response.json();
        } catch (error) {

        }
        if (response.ok) {
            console.log('LoggedIn');
            // auth.login(data?.email)
        } else {
            setError('حساب فعالی با اطلاعات داده شده وجود ندارد');
            return;
        }
    }



    return (
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
                    <Link href="#" className="font-[Vazir-Medium] ml-auto inline-block text-sm underline">
                        رمز عبور خود را فراموش کرده اید؟
                    </Link>
                    </div>
                    <Input id="password" name="password" type="password" required className="[direction:ltr]" />
                </div>
                {error ? <p className="mt-2 w-full font-[Vazir-Medium] text-red-700">{error}</p> : undefined}
                <Button type="submit" className="mt-2 w-full font-[Vazir-Medium]">
                    ورود
                </Button>
            </form>
            <Button variant="outline" className="w-full font-[Vazir-Medium]">
                ورود با حساب گوگل
            </Button>
            </div>
            <div className="mt-4 text-center text-sm font-[Vazir-Medium]">
            حساب کاربری ندارید؟
            <Link href="#" className="underline">
                ثبت نام
            </Link>
            </div>
        </CardContent>
        </Card>
    )
}
