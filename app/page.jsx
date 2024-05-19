"use client"
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Input } from "@nextui-org/input";
import FrontendLayout from "@/app/_layouts/FrontendLayout";

export default function Home() {

	return (
		<FrontendLayout>
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<div className="inline-block max-w-lg text-center justify-center">
					<h1 className={title()}>Make&nbsp;</h1>
					<h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
					<br />
					<h1 className={title()}>
						websites regardless of your design experience.
					</h1>
					<h2 className={subtitle({ class: "mt-4" })}>
						Beautiful, fast and modern React UI library.
					</h2>
				</div>


				<div className="w-full flex flex-col gap-4">
					<div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
						<Input type="email" variant="flat" label="Email" />
					</div>
				</div>

				<div className="flex gap-3">
					<Link
						isExternal
						href={siteConfig.links.docs}
						className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
					>
						Documentation
					</Link>
					<Link
						isExternal
						className={buttonStyles({ variant: "bordered", radius: "full" })}
						href={siteConfig.links.github}
					>
						<GithubIcon size={20} />
						GitHub
					</Link>
				</div>

				<div className="mt-8">
					<Snippet hideSymbol hideCopyButton variant="flat">
						<span>
							Get started by editing <Code color="primary">app/page.tsx</Code>
						</span>
					</Snippet>
				</div>
			</section>
		</FrontendLayout>
	);
}
