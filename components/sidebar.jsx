"use client"
import React from 'react'
import { Button } from '@nextui-org/button'
import { ScrollShadow } from '@nextui-org/scroll-shadow'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAppContext } from '@/context'
import { siteConfig } from '@/config/site'


const Sidebar = () => {
    const pathname = usePathname();
    const { isNabarCollapsed, credential } = useAppContext();

    return (
        <div className={`grow flex flex-col px-1 max-lg:hidden overflow-hidden shrink-0 ${isNabarCollapsed ? 'max-w-[4.5rem] w-[4.5rem]' : 'max-w-56 w-full'}`}>
            <div className="flex flex-col grow overflow-hidden">
                <ScrollShadow hideScrollBar as={"ul"} className="flex-grow overflow-y-auto pb-5">
                    {
                        siteConfig?.navItems?.map(link => {
                            if(link?.isAuthenticaed) {
                                if(credential?.accessToken) {
                                    return (
                                        <li className="p-1" key={link?.href}>
                                            <Button as={Link} href={link?.href} startContent={link?.icon && <link.icon className="size-6 text-sky-600 dark:text-default-800" />} color="default" variant="light" className={`w-full justify-start gap-4 font-semibold ${isNabarCollapsed ? 'min-w-0' : ''} ${pathname === link?.href ? 'bg-default-100 dark:bg-default-100' : ''}`}>
                                                <span className={isNabarCollapsed ? 'hidden' : ''}> {link?.label} </span>
                                            </Button>
                                        </li>
                                    )
                                } else {return}
                            } else {
                                return (
                                    <li className="p-1" key={link?.href}>
                                    <Button as={Link} href={link?.href} startContent={link?.icon && <link.icon className="size-6 text-sky-600 dark:text-default-800" />} color="default" variant="light" className={`w-full justify-start gap-4 font-semibold ${isNabarCollapsed ? 'min-w-0' : ''} ${pathname === link?.href ? 'bg-default-100 dark:bg-default-100' : ''}`}>
                                        <span className={isNabarCollapsed ? 'hidden' : ''}> {link?.label} </span>
                                    </Button>
                                </li>
                                )
                            }
                        }
                        )
                    }
                </ScrollShadow>
            </div>
        </div>
    )
}

export default Sidebar