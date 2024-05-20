"use client"
import { Button } from '@nextui-org/button';
import { CategoryAddIcon, CategoryIcon, DashboardIcon, FacebookIcon, InstagramIcon, Logo, LogoutIcon, TelegramIcon, ThreadsIcon, TrendingAddIcon, TrendingIcon, VideoAddIcon, VideoLibraryIcon } from '@/components/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutConfirmModal from './modal/logoutConfirmModal';
import { useDisclosure } from '@nextui-org/modal';
const SidebarAdmin = ({ sidebarIsOpen, setSidebarIsOpen }) => {
    const pathname = usePathname();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const sideLinks = [
        { href: '/admin/dashboard', label: 'Dashboard', icon: DashboardIcon },
        { href: '/admin/all-videos', label: 'All Videos', icon: VideoLibraryIcon },
        { href: '/admin/all-videos/add', label: 'Add Video', icon: VideoAddIcon },
        { href: '/admin/categories', label: 'Categories', icon: CategoryIcon },
        { href: '/admin/categories/add', label: 'Add Category', icon: CategoryAddIcon },
        { href: '/admin/status', label: 'Status', icon: TrendingIcon },
        { href: '/admin/status/add', label: 'Add Status', icon: TrendingAddIcon },
    ];

    return (
        <>
            {sidebarIsOpen && <div className='fixed inset-0 z-40 backdrop-blur-lg' onClick={() => { setSidebarIsOpen(!sidebarIsOpen) }}></div>}
            <div className={`w-72 shrink-0 h-full lg:py-8 overflow-hidden max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:z-50 max-lg:-translate-x-full ${sidebarIsOpen ? 'max-lg:translate-x-0' : ''}`}>
                <div className="w-full bg-white dark:bg-zinc-800 lg:rounded-3xl shadow-lg h-full overflow-hidden p-5 flex flex-col">
                    <Link href={'/admin'} title='Logoipsum' className="w-full *:text-primary-500 dark:*:text-white md:*:w-48 *:w-40 *:aspect-[344/62]"><Logo className="size-full" /></Link>
                    <div className="flex flex-col py-8 overflow-hidden -mr-5 grow">
                        <div className='flex flex-col overflow-auto h-full pr-5'>
                            {
                                sideLinks?.map(link => (
                                    <Link href={link?.href} key={link?.href} className={`flex items-center sm:gap-3 gap-2 py-3 px-4 rounded-lg text-zinc-600 md:hover:bg-zinc-100 dark:text-zinc-300 dark:md:hover:text-white dark:md:hover:bg-zinc-900 duration-300 font-medium ${pathname == link.href ? '!text-white !bg-primary' : ''}`}>
                                        <div className="icon xl:*:size-5 *:size-4">
                                            {link.icon && <link.icon />}
                                        </div>
                                        <div className="title xl:text-base text-sm">{link?.label}</div>
                                    </Link>
                                ))
                            }

                        </div>
                    </div>
                    <div className='w-full pt-3 pb-2 text-sm text-primary-300 dark:text-zinc-100 text-center'>Follow For More Updates</div>
                    <div className="flex gap-3 items-center justify-center pb-3">
                        <Button isIconOnly size='sm' variant='flat' color='primary' className='text-xl' aria-label="Telegram" title='Telegram'>
                            <TelegramIcon className="size-5" />
                        </Button>
                        <Button isIconOnly size='sm' variant='flat' color='danger' className='text-xl' aria-label="Instagram" title='Instagram'>
                            <InstagramIcon className="size-5" />
                        </Button>
                        <Button isIconOnly size='sm' variant='flat' color='primary' className='text-xl' aria-label="Facebook" title='Facebook'>
                            <FacebookIcon className="size-5" />
                        </Button>
                        <Button isIconOnly size='sm' variant='flat' color='default' className='text-xl' aria-label="Threads" title='Threads'>
                            <ThreadsIcon className="size-5" />
                        </Button>
                    </div>
                    <div className='w-full'>
                        <Button
                            type='button' 
                            onPress={() => {
                                onOpen()
                            }}
                            variant="solid" className='w-full font-medium xl:text-base text-sm bg-rose-100 text-rose-600 dark:bg-rose-600 dark:text-white' endContent={<LogoutIcon className="size-5" />} >
                            Logout
                        </Button>
                        <LogoutConfirmModal isOpen={isOpen} onOpenChange={onOpenChange} />
                    </div>

                </div>
            </div>
        </>
    )
}

export default SidebarAdmin