import { Navbar } from "@/components/navbar";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Suspense } from "react";

export default function AuthLayout({
	children
}) {
	return (
		<>
			<Suspense fallback={"Loading..."}>
				<Navbar />
			</Suspense>
			<div className="flex h-dvh min-h-svh bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-white overflow-hidden relative lg:pl-5">
				<div className="grow flex overflow-hidden flex-col">
					Auth header
					<ScrollShadow className="flex flex-col items-center pb-5 gap-4 overflow-y-auto">
						<main className="container mx-auto max-w-7xl px-6 flex-grow">
							{children}
						</main>
					</ScrollShadow>
				</div>
			</div>
		</>
	);
}
