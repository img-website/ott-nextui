import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";

export default function FrontendLayout({
	children,
}) {
	return (
		<div className="relative flex flex-col h-screen">
			<Navbar />
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<div className="inline-block max-w-lg text-center justify-center">
					<main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
						{children}
					</main>
				</div>
			</section>
			<footer className="w-full flex items-center justify-center py-3">
				<Link
					isExternal
					className="flex items-center gap-1 text-current"
					href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
					title="nextui.org homepage"
				>
					<span className="text-default-600">Powered by</span>
					<p className="text-primary">NextUI</p>
				</Link>
			</footer>
		</div>
	);
}
