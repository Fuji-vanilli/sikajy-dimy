import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function VerifyRequest() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Please check your email</CardTitle>
                <CardDescription>We have sent a verification email code to your email address. Please open the email and paste the code below</CardDescription>
            </CardHeader>
        </Card>
    )
}