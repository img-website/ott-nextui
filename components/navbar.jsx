"use client"
import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarBrand,
	NavbarItem,
} from "@nextui-org/navbar";

import Link from "next/link";
import NextLink from "next/link";

import { ThemeSwitch } from "@/components/theme-switch";
import {
	SearchIcon,
	MenuIcon,
	BackIcon,
} from "@/components/icons";

import { Logo } from "@/components/icons";
import SearchInput from "./searchInput";
import { Suspense } from "react";
import { useAppContext } from "@/context";
import GoogleLogin from "./googleLogin";

export const Navbar = () => {
	const { toggleNavbar, isSearchInputVisible, toggleSearchInput } = useAppContext();

	return (
		<>
			<NextUINavbar maxWidth="full" position="sticky">
				<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
					<MenuIcon className="hidden lg:flex size-7" onClick={toggleNavbar} />
					<NavbarBrand as="li" className="gap-3 max-w-fit">
						<NextLink className="flex justify-start items-center gap-1" href="/">
							<Logo className="md:w-32 w-24 transition-all text-sky-600 dark:text-white" />
						</NextLink>
					</NavbarBrand>
					{/* <ul className="hidden lg:flex gap-4 justify-start ml-2">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium"
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</ul> */}
				</NavbarContent>

				<NavbarContent
					className="hidden sm:flex basis-1/5 sm:basis-6/12 md:basis-4/12"
					justify="center"
				>
					<NavbarItem className="flex w-full">
						<Suspense fallback={"Loading..."}>
							<SearchInput />
						</Suspense>
					</NavbarItem>
				</NavbarContent>

				<NavbarContent
					className="hidden sm:flex basis-1/5 sm:basis-full"
					justify="end"
				>
					<NavbarItem className="hidden sm:flex gap-2">
						<ThemeSwitch />
					</NavbarItem>
					<NavbarItem className="flex">
						<GoogleLogin />
					</NavbarItem>
				</NavbarContent>
				{
					isSearchInputVisible &&
					<NavbarContent className="w-full sm:hidden fixed top-0 inset-x-0 z-30 flex items-center px-4 bg-white dark:bg-default-50" justify="center">
						<NavbarItem className="flex gap-2">
							<Link as={NextLink} href="javascript:void(0)" onClick={toggleSearchInput}>
								<BackIcon className="sm:size-5 size-5 text-default-600 dark:text-default-600" />
							</Link>
						</NavbarItem>
						<NavbarItem className="flex gap-2 grow">
							<Suspense fallback={"Loading..."}>
								<SearchInput />
							</Suspense>
						</NavbarItem>
					</NavbarContent>
				}

				<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
					<NavbarItem className="flex gap-2">
						<Link as={NextLink} onClick={toggleSearchInput} href="javascript:void(0)">
							<SearchIcon className="sm:size-5 size-4 text-default-600 dark:text-default-600" />
						</Link>
					</NavbarItem>
					<NavbarItem className="flex gap-2">
						<ThemeSwitch />
					</NavbarItem>
					<NavbarItem className="flex">
						<GoogleLogin />
					</NavbarItem>
				</NavbarContent>

				{/* <NavbarMenu>
				
				<Suspense fallback={"Loading..."}>
					<SearchInput />
				</Suspense>
				
				<div className="mx-4 mt-2 flex flex-col gap-2">
					{siteConfig.navMenuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								color={
									index === 2
										? "primary"
										: index === siteConfig.navMenuItems.length - 1
											? "danger"
											: "foreground"
								}
								href="#"
								size="lg"
							>
								{item.label}
							</Link>
						</NavbarMenuItem>
					))}
				</div>
			</NavbarMenu> */}
			</NextUINavbar>


		</>
	);
};
