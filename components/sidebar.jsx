"use client"
import React from 'react'
import { Button } from '@nextui-org/button'
import { ScrollShadow } from '@nextui-org/scroll-shadow'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CategoryAddIcon, CategoryIcon, DashboardIcon, TrendingAddIcon, TrendingIcon, VideoAddIcon, VideoLibraryIcon } from "@/components/icons";
import { useAppContext } from '@/context'

const Sidebar = () => {
    const pathname = usePathname();
    const { isNabarCollapsed } = useAppContext();

    const sideLinks = [
        { href: '/', label: 'Dashboard', icon: DashboardIcon },
        { href: '/all-videos', label: 'All Videos', icon: VideoLibraryIcon },
        { href: '/all-videos/add', label: 'Add Video', icon: VideoAddIcon },
        { href: '/categories', label: 'Categories', icon: CategoryIcon },
        { href: '/categories/add', label: 'Add Category', icon: CategoryAddIcon },
        { href: '/status', label: 'Status', icon: TrendingIcon },
        { href: '/status/add', label: 'Add Status', icon: TrendingAddIcon },
        { href: '/all-videos1', label: 'All Videos', icon: VideoLibraryIcon },
        { href: '/all-videos/add1', label: 'Add Video', icon: VideoAddIcon },
        { href: '/categories1', label: 'Categories', icon: CategoryIcon },
        { href: '/categories/add1', label: 'Add Category', icon: CategoryAddIcon },
        { href: '/status1', label: 'Status', icon: TrendingIcon },
        { href: '/status/add1', label: 'Add Status', icon: TrendingAddIcon },
    ];
    return (
        <div className={`grow flex flex-col px-1 max-lg:hidden overflow-hidden shrink-0 ${isNabarCollapsed ? 'max-w-[4.5rem] w-[4.5rem]' : 'max-w-56 w-full'}`}>
            <div className="flex flex-col grow overflow-hidden">
                <ScrollShadow hideScrollBar as={"ul"} className="flex-grow overflow-y-auto pb-5">
                    {
                        sideLinks?.map(link => (
                            <li className="p-1" key={link?.href}>
                                <Button as={Link} href={link?.href} startContent={link?.icon && <link.icon className="size-6 text-sky-600 dark:text-default-800" />} color="default" variant="light" className={`w-full justify-start gap-4 font-semibold ${isNabarCollapsed ? 'min-w-0' : ''} ${pathname === link?.href ? 'bg-default-100 dark:bg-default-100' : ''}`}>
                                    <span className={isNabarCollapsed ? 'hidden' : ''}> {link?.label} </span>
                                </Button>
                            </li>
                        ))
                    }
                </ScrollShadow>
            </div>
        </div>
    )
}

export default Sidebar