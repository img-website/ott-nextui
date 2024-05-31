import { CategoryAddIcon, CategoryIcon, HeartFilledIcon, HomeIcon, LogoutIcon, TrendingAddIcon, TrendingIcon, VideoAddIcon, VideoLibraryIcon } from "@/components/icons";

export const siteConfig = {
        name: "OTT Platform",
        short_name: "OTT",
        title: "OTT Platform",
        description: "Make beautiful websites regardless of your design experience.",
        navItems: [
                { href: '/', label: 'Home', icon: HomeIcon, isAuthenticaed: false },
                { href: '/wishlist', label: 'Wishlist', icon: HeartFilledIcon, isAuthenticaed: true },
                { href: '/all-videos', label: 'All Videos', icon: VideoLibraryIcon, isAuthenticaed: false },
                { href: '/categories', label: 'Categories', icon: CategoryIcon, isAuthenticaed: false },
                { href: '/status', label: 'Status', icon: TrendingIcon, isAuthenticaed: false },
                { href: '/about', label: 'About', icon: LogoutIcon, isAuthenticaed: false }
        ],
        navMenuItems: [
                { href: '/', label: 'Home', icon: HomeIcon, isAuthenticaed: false },
                { href: '/wishlist', label: 'Wishlist', icon: HeartFilledIcon, isAuthenticaed: true },
                { href: '/all-videos', label: 'All Videos', icon: VideoLibraryIcon, isAuthenticaed: false },
                { href: '/categories', label: 'Categories', icon: CategoryIcon, isAuthenticaed: false },
                { href: '/status', label: 'Status', icon: TrendingIcon, isAuthenticaed: false },
                { href: '/about', label: 'About', icon: LogoutIcon, isAuthenticaed: false }
        ],
        links: {
                github: "https://github.com",
                twitter: "https://twitter.com",
                docs: "https://nextui.org",
                discord: "https://discord.gg",
                sponsor: "https://patreon.com"
        },
};
