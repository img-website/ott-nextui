import { HeartFilledIcon, HomeIcon, MenuIcon, PlusIcon, StarsIcon, VideoLibraryIcon } from "@/components/icons";

export const siteConfig = {
        name: process.env.NEXT_PROJECT_NAME,
        short_name: process.env.NEXT_PROJECT_SHORT_NAME,
        title: process.env.NEXT_PROJECT_NAME,
        description: process.env.NEXT_PROJECT_DESCRIPTION,
        navItems: [
                { href: '/', label: 'Home', icon: HomeIcon, isAuthenticaed: false },
                { href: '/new-shorts', label: 'New Shorts', icon: StarsIcon, isAuthenticaed: false },
                // { href: '/categories', label: 'Categories', icon: CategoryIcon, isAuthenticaed: false },
                { href: '/all-videos', label: 'All Videos', icon: VideoLibraryIcon, isAuthenticaed: false },
                { href: '/wishlist', label: 'Wishlist', icon: HeartFilledIcon, isAuthenticaed: true },
                { href: '/follow-us', label: 'Follow US', icon: PlusIcon, isAuthenticaed: false }
        ],
        mobileNavItems: [
                { href: '/wishlist', label: 'Wishlist', icon: HeartFilledIcon, isAuthenticaed: true },
                { href: '/follow-us', label: 'Follow US', icon: PlusIcon, isAuthenticaed: false }
        ],
        mobileBottomNavItems: [
                { id:'home', href: '/', label: 'Home', icon: HomeIcon, isAuthenticaed: false },
                { id:'new-shorts', href: '/new-shorts', label: 'New Shorts', icon: StarsIcon, isAuthenticaed: false },
                { id:'all-videos', href: '/all-videos', label: 'All Videos', icon: VideoLibraryIcon, isAuthenticaed: false },
                { id:'menu', href: '/menu', label: 'Menu', icon: MenuIcon, isAuthenticaed: false }
        ],
        links: {
                facebook: process.env.NEXT_FACEBOOK,
                instagram: process.env.NEXT_INSTAGRAM,
                youtube: process.env.NEXT_YOUTUBE,
                telegram: process.env.NEXT_TELEGRAM,
                messenger: process.env.NEXT_MESSENGER
        },
};
