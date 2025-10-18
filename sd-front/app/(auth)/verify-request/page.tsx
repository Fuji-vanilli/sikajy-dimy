"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useState, useTransition } from "react";
import { toast } from "sonner";

export default function VerifyRequest() {
    const router = useRouter();
    const [otp, setOtp] = useState(""); 
    const [emailPending, startTransition] = useTransition();
    const params = useSearchParams();
    const email = params.get("email") as string;

    function verifyOtp() {
        startTransition(async ()=> {
            await authClient.signIn.emailOtp({
                email: email,
                otp: otp,
                fetchOptions: {
                    onSuccess: ()=> {
                        toast.success("Successfully verified your email");
                        router.push("/");
                    },
                    onError: ()=> {
                        toast.error("Invalid OTP code");
                    },
                }
            })
        });
    }
    return (
        <Card className="w-full mx-auto">
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Please check your email</CardTitle>
                <CardDescription>We have sent a verification email code to your email address. Please open the email and paste the code below</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center space-y-2">
                    <InputOTP 
                        value={otp}
                        onChange={(value)=> setOtp(value)}
                        maxLength={6} 
                        className="gap-2"
                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0}/>
                            <InputOTPSlot index={1}/>
                            <InputOTPSlot index={2}/>
                        </InputOTPGroup>
                        <InputOTPGroup>
                            <InputOTPSlot index={3}/>
                            <InputOTPSlot index={4}/>
                            <InputOTPSlot index={5}/>
                        </InputOTPGroup>
                    </InputOTP>
                    <p className="text-sm text-muted-foreground">Enter the 6-digit code sent in your email</p>
                </div>
                <Button 
                    onClick={verifyOtp} 
                    className="w-full mt-4"
                    disabled={!otp || otp.length !== 6 || emailPending}
                >
                    {emailPending ? (
                        <>
                            <Loader2 className="size-4 mr-2 animate-spin"/>
                            <p>Verifying...</p>
                        </>
                    ): (
                        <p>Verify Account</p>)}
                </Button>
            </CardContent>
        </Card>
    )
}