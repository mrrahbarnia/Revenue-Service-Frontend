"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/store/auth-provider";
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

const CHANGE_PASSWORD_INTERNAL_ENDPOINT = '/api/change-password/'
const LOGOUT_INTERNAL_ENDPOINT = '/api/logout/'



export default function Page() {
    const auth = useAuth();
    const router = useRouter();
    const message = useMessage();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    auth.checkAuthenticationState();

    const formSubmitHandler = async(event) => {
        setIsLoading(true);
        event.preventDefault();
        if (event.target["new-password"].value.length < 8) {
            setError("رمز عبور میبایست حداقل هشت کاراکتر باشد.");
            setIsLoading(false);
            return;
        }
        if (event.target["new-password"].value !== event.target['confirm-password'].value) {
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

        const response = await fetch(CHANGE_PASSWORD_INTERNAL_ENDPOINT, requestOptions);

        let data = {};
        try {
            data = await response.json();
        } catch (error) {

        }
        if (response.status === 401) {
            auth.unauthorizedRedirect();
        }
        if (response.ok) {
            message.messageLogin("Password Changed Successfully.");
            await fetch(LOGOUT_INTERNAL_ENDPOINT);
            auth.logout();
            router.replace('/users/login/');
            return;
        } else {
            console.log(data);
            if (data["new_password"]) {
                if (data["new_password"][0] === "Password must contain special character.") {
                    setError("رمز عبور میبایست شامل حروف خاص باشد(@,$,...)");
                    setIsLoading(false);
                    return;
                } else if (data["new_password"][0] === "Password must contain letters.") {
                    setError("رمز عبور میبایست شامل حروف باشد.");
                    setIsLoading(false);
                    return;
                } else if (data["new_password"][0] === "Password must contain numbers.") {
                    setError("رمز عبور میبایست شامل اعداد باشد.");
                    setIsLoading(false);
                    return;
                }
                console.log(data.password[0])
            } else if (data.detail === "Password is wrong!") {
                setError("رمز عبور قبلی اشتباه است.");
                setIsLoading(false);
                return;
            }
            return;
        }
    }

    return (
        <Card className="mx-auto max-w-sm">
        <CardHeader>
            <CardTitle className="font-[Vazir-Medium] text-2xl">تغییر رمز عبور</CardTitle>
            <CardDescription className="font-[Vazir-Medium]">
                رمز عبور میباست حداقل هشت کاراکتر و ترکیبی از اعداد,حروف و کاراکترهای خاص(@,$,...) باشد.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid gap-4">
            <form onSubmit={formSubmitHandler} >
                <div className="grid gap-2">
                    <Label className="font-[Vazir-Medium]" htmlFor="old-password">رمز عبور قبلی</Label>
                    <Input
                    id="old-password"
                    type="password"
                    name="old-password"
                    required
                    className="[direction:ltr]"
                    />
                </div>
                <div className="grid gap-2 mt-2">
                    <div className="flex gap-16 items-center">
                    <Label className="font-[Vazir-Medium]" htmlFor="new-password">رمز عبور جدید</Label>
                    </div>
                    <Input id="new-password" name="new-password" type="password" required className="[direction:ltr]" />
                </div>
                <div className="grid gap-2 mt-2">
                    <div className="flex gap-16 items-center">
                    <Label className="font-[Vazir-Medium]" htmlFor="confirm-password">تکرار رمز عبور جدید</Label>
                    </div>
                    <Input id="confirm-password" name="confirm-password" type="password" required className="[direction:ltr]" />
                </div>
                {error ? <p className="mt-2 w-full font-[Vazir-Medium] text-red-700">{error}</p> : undefined}
                <Button disabled={isLoading} type="submit" className="bg-purple-800 mt-2 w-full font-[Vazir-Medium]">
                    {isLoading ? "صبر کنید" : "تغییر رمز" }
                </Button>
            </form>
            </div>
        </CardContent>
        </Card>
    )
}