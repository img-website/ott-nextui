"use client"
import { EyeFilledIcon, EyeSlashFilledIcon, GlassesIcon, LockOpenIcon, LoginCircleIcon, OutlineMailIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";

const AdminSignin = ({ isLoading, isVisible, setIsVisible, email, setEmail, password, setPassword, submitHandler }) => {

    return (
        <>
            <Card as={"form"} onSubmit={submitHandler} className="w-96 dark:bg-gray-800 dark:text-white mx-auto has-[[aria-label=Loading]]:!pointer-events-none [&_label]:has-[[aria-label=Loading]]:!pointer-events-none">
                <CardHeader className="flex gap-3 justify-center">
                    <GlassesIcon className="size-6" />
                    <div className="flex flex-col">
                        <p className="text-lg font-bold">Sign In</p>
                    </div>
                </CardHeader>
                <Divider className="opacity-50" />
                <CardBody className="dark:bg-gray-900/50 grid grid-cols-1 gap-x-6 gap-y-3">
                    <div className="mb-4">
                        <Input
                            isClearable
                            label="Email ID"
                            isRequired
                            size="lg"
                            variant="bordered"
                            startContent={<OutlineMailIcon size={18} />}
                            type="email"
                            id="email"
                            autoComplete="username"
                            value={email}
                            onValueChange={setEmail}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            label="Password"
                            isRequired
                            size="lg"
                            variant="bordered"
                            startContent={<LockOpenIcon size={18} />}
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={() => { setIsVisible(!isVisible) }}>
                                    {isVisible ? (
                                        <EyeSlashFilledIcon className="size-5 text-default-400 pointer-events-none" />
                                    ) : (
                                        <EyeFilledIcon className="size-5 text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onValueChange={setPassword}
                        />
                    </div>
                </CardBody>
                <Divider className="opacity-50" />
                <CardFooter>
                    <div className="flex gap-4 items-center w-full">
                        {
                            !isLoading ?
                                <Button type="submit" variant="solid" size="lg" className="!w-full bg-purple-700 text-white font-semibold" startContent={<LoginCircleIcon className="size-5" />}>
                                    Sign In
                                </Button>
                                :
                                <Button type="button" variant="solid" isLoading size="lg" className="!w-full bg-purple-700 text-white font-semibold [&_[aria-label=Loading]>*]:size-4">
                                    Loading...
                                </Button>
                        }
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}

export default AdminSignin