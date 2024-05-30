import MobileFooter from "@/components/mobileFooter";
import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import UserDetails from "@/utils/_userDetails";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

export default function SecondLayout({
	children
}) {
	return (
		<div className="h-dvh flex flex-col">
			<UserDetails />
			<Navbar />
			<div className="grow flex overflow-hidden pb-1">
				<Sidebar />
				<ScrollShadow className="grow flex flex-col">
					<div className="flex-1 flex flex-col px-4">
						{children}
					</div>
				</ScrollShadow>
			</div>
			<MobileFooter />
		</div>
	);
}
