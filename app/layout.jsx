import "@/styles/globals.css";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "@/app/providers";
import clsx from "clsx";
import { Toaster } from "react-hot-toast";
import { AuthUserProvider } from "@/context/AuthenticationContext";

export const metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: "/favicon.ico",
	},
};

export const viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
}

export default function RootLayout({
	children
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<AuthUserProvider>
					<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
						{children}
						<div id="modal-root" />
					</Providers>
				</AuthUserProvider>
				<Toaster
					position="bottom-center"
					reverseOrder={false}
					gutter={8}
					containerClassName=""
					containerStyle={{}}
					toastOptions={{
						// Define default options
						className: '',
						duration: 5000,
						style: {
							background: '#363636',
							color: '#fff',
						},

						// Default options for specific types
						success: {
							duration: 3000,
							theme: {
								primary: 'green',
								secondary: 'black',
							},
						},
					}}
				/>
			</body>
		</html>
	);
}
