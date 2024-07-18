"use client"
import { useState } from "react";
import { emailIsValid } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
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

const REGISTER_INTERNAL_ENDPOINT = '/api/register/'



export default function Page() {
    const message = useMessage();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const formSubmitHandler = async(event) => {
        setIsLoading(true);
        event.preventDefault();
        if (!emailIsValid(event.target.email.value)) {
            setError("فرمت ایمیل وارد شده صحیح نیست.");
            setIsLoading(false);
            return;
        }
        if (event.target.password.value.length < 8) {
            setError("رمز عبور میبایست حداقل هشت کاراکتر باشد.");
            setIsLoading(false);
            return;
        }
        if (event.target.password.value !== event.target['confirm-password'].value) {
            setError("رمز های عبور مطابقت ندارند.");
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

        const response = await fetch(REGISTER_INTERNAL_ENDPOINT, requestOptions);

        let data = {};
        try {
            data = await response.json();
        } catch (error) {

        }
        if (response.ok) {
            message.messageVerifyAcc("Registered Successfully");
            router.replace('/verify-account/');
        } else {
            console.log(data);
            if (data.password) {
                if (data.password[0] === "Password must contain special character.") {
                    setError("رمز عبور میبایست شامل حروف خاص باشد(@,$,...)");
                    setIsLoading(false);
                    return;
                } else if (data.password[0] === "Password must contain letters.") {
                    setError("رمز عبور میبایست شامل حروف باشد.");
                    setIsLoading(false);
                    return;
                } else if (data.password[0] === "Password must contain numbers.") {
                    setError("رمز عبور میبایست شامل اعداد باشد.");
                    setIsLoading(false);
                    return;
                }
                console.log(data.password[0])
            } else if (data.detail === "User already exists!") {
                setError("ایمیل وارد شده تکراریست.");
                setIsLoading(false);
                return;
            }
            return;
        }
    }

    return (
        <Card className="mx-auto max-w-sm">
        <CardHeader>
            <CardTitle className="font-[Vazir-Medium] text-2xl">ثبت نام</CardTitle>
            <CardDescription className="font-[Vazir-Medium]">
            با ایمیل یا حساب گوگل خود ثبت نام کنید
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
                    </div>
                    <Input id="password" name="password" type="password" required className="[direction:ltr]" />
                </div>
                <div className="grid gap-2 mt-2">
                    <div className="flex gap-16 items-center">
                    <Label className="font-[Vazir-Medium]" htmlFor="confirm-password">تکرار رمز عبور</Label>
                    </div>
                    <Input id="confirm-password" name="confirm-password" type="password" required className="[direction:ltr]" />
                </div>
                {error ? <p className="mt-2 w-full font-[Vazir-Medium] text-red-700">{error}</p> : undefined}
                <Button disabled={isLoading} type="submit" className="bg-purple-800 mt-2 w-full font-[Vazir-Medium]">
                    {isLoading ? "صبر کنید" : "ثبت نام" }
                </Button>
            </form>
            <Button className="bg-purple-800 w-full font-[Vazir-Medium]">
                ثبت نام با حساب گوگل
            </Button>
            </div>
            <div className="mt-4 text-center text-sm font-[Vazir-Medium]">
            حساب کاربری دارید؟
            <Link href="/login/" className="underline">
                ورود
            </Link>
            </div>
        </CardContent>
        </Card>
    )
}