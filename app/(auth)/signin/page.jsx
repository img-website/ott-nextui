import React, { Suspense } from "react";
import SigninWithGoogle from "./_signinWithGoogle";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

export default function SigninPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Card className="w-full max-w-xs">
                <CardHeader className="flex flex-col gap-1 text-lg font-bold">Signin With</CardHeader>
                <Divider />
                <CardBody className="flex flex-col gap-3 p-3">
                    <Suspense fallback={"Loading..."}>
                        <SigninWithGoogle />
                        {/* <SigninWithFacebook />
                        <SigninWithGithub /> */}
                    </Suspense>
                </CardBody>
            </Card>
        </div>
    );
}
