"use client"
import React from 'react'
import { siteConfig } from '@/config/site'
import { ScrollShadow } from '@nextui-org/scroll-shadow'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import { useAppContext } from '@/context'

const MenuPage = () => {
    const { credential } = useAppContext();
    return (
        <ScrollShadow hideScrollBar as={"ul"} className="flex-grow overflow-y-auto pb-5">
            {
                siteConfig?.mobileNavItems?.map(link => {
                    if (link?.isAuthenticaed) {
                        if (credential?.accessToken) {
                            return (
                                <li className="p-1" key={link?.href}>
                                    <Button as={Link} href={link?.href} startContent={link?.icon && <link.icon className="size-6 text-sky-600 dark:text-default-800" />} color="default" variant="light" className={`w-full justify-start gap-4 font-semibold`}>
                                        <span> {link?.label} </span>
                                    </Button>
                                </li>
                            )
                        } else { return }
                    } else {
                        return (
                            <li className="p-1" key={link?.href}>
                                <Button as={Link} href={link?.href} startContent={link?.icon && <link.icon className="size-6 text-sky-600 dark:text-default-800" />} color="default" variant="light" className={`w-full justify-start gap-4 font-semibold`}>
                                    <span> {link?.label} </span>
                                </Button>
                            </li>
                        )
                    }
                }
                )
            }
        </ScrollShadow>
    )
}

export default MenuPage