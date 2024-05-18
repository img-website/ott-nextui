import NavbarAdmin from "@/components/navbarAdmin";
import SidebarAdmin from "@/components/sidebarAdmin";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import React from "react";

export default function AdminLayout({
	children,
}) {
	const [sidebarIsOpen, setSidebarIsOpen] = React.useState(false);

	return (
		<div className="flex h-dvh min-h-svh bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-white overflow-hidden relative lg:pl-5">
			<SidebarAdmin sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} />
			<div className="grow flex overflow-hidden flex-col">
				<NavbarAdmin sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} />
				<ScrollShadow className="flex flex-col items-center pb-5 gap-4 overflow-y-auto">
					<main className="container mx-auto max-w-7xl px-6 flex-grow">
						{children}
					</main>
				</ScrollShadow>
			</div>
		</div>
	);
}
