"use client"
import { Button } from '@nextui-org/button';
import { Image } from '@nextui-org/image';
import React, { Suspense } from 'react'
import { NextImage } from 'next/image'
import { signOut } from 'firebase/auth';
import { auth } from '@/app/firebase/firebase';

const AboutPage = () => {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <Suspense fallback={<div>Loading...</div>}>
                <Button
                    onClick={() => {
                        signOut(auth).then(() => {
                            // Sign-out successful.
                        }).catch((error) => {
                            // An error happened.
                        });
                    }}
                >Logout</Button>
                <Image
                    as={NextImage}
                    isBlurred
                    isZoomed
                    width={240}
                    height={240}
                    src="https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg"
                    alt="NextUI Album Cover"
                />
            </Suspense>
        </section>
    )
}

export default AboutPage