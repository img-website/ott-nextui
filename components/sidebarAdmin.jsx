"use client"
import { Button } from '@nextui-org/button';
import { CategoryAddIcon, CategoryIcon, DashboardIcon, FacebookIcon, InstagramIcon, LogoutIcon, TelegramIcon, ThreadsIcon, TrendingAddIcon, TrendingIcon, VideoAddIcon, VideoLibraryIcon } from '@/components/icons';
import Link from 'next/link';
const SidebarAdmin = () => {

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
            <div className="w-72 shrink-0 h-full lg:py-8 overflow-hidden max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:z-50 max-lg:translate-x-0">
                <div className="w-full bg-white dark:bg-zinc-800 lg:rounded-3xl shadow-lg h-full overflow-hidden p-5 flex flex-col">
                    <Link href={'/'} title='Logoipsum' className="w-full *:text-primary-500 dark:*:text-white md:*:w-48 *:w-40 *:aspect-[344/62]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 220 40"><path fill="currentColor" d="M20 40c11.046 0 20-8.954 20-20V6a6 6 0 0 0-6-6H21v8.774c0 2.002.122 4.076 1.172 5.78a9.999 9.999 0 0 0 6.904 4.627l.383.062a.8.8 0 0 1 0 1.514l-.383.062a10 10 0 0 0-8.257 8.257l-.062.383a.8.8 0 0 1-1.514 0l-.062-.383a10 10 0 0 0-4.627-6.904C12.85 21.122 10.776 21 8.774 21H.024C.547 31.581 9.29 40 20 40Z"></path><path fill="currentColor" d="M0 19h8.774c2.002 0 4.076-.122 5.78-1.172a10.018 10.018 0 0 0 3.274-3.274C18.878 12.85 19 10.776 19 8.774V0H6a6 6 0 0 0-6 6v13ZM46.455 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM211.711 12.104c5.591 0 8.289 3.905 8.289 8.428v8.495h-5.851V21.54c0-2.05-.748-3.742-2.893-3.742-2.145 0-2.86 1.692-2.86 3.742v7.486h-5.851V21.54c0-2.05-.715-3.742-2.861-3.742-2.145 0-2.893 1.692-2.893 3.742v7.486h-5.85v-8.495c0-4.523 2.697-8.428 8.288-8.428 3.056 0 5.266 1.204 6.274 3.189 1.072-1.985 3.413-3.19 6.208-3.19ZM180.427 23.82c1.885 0 2.698-1.725 2.698-3.776v-7.29h5.85v8.006c0 4.784-2.795 8.755-8.548 8.755-5.754 0-8.549-3.97-8.549-8.755v-8.006h5.851v7.29c0 2.05.812 3.776 2.698 3.776ZM163.275 29.547c-3.673 0-6.046-1.269-7.444-3.742l4.226-2.376c.585 1.041 1.462 1.562 2.925 1.562 1.203 0 1.755-.423 1.755-.944 0-1.985-8.581.033-8.581-6.28 0-3.06 2.6-5.533 7.021-5.533 3.868 0 5.981 1.887 6.924 3.71l-4.226 2.408c-.357-.976-1.463-1.562-2.568-1.562-.845 0-1.3.358-1.3.846 0 2.018 8.581.163 8.581 6.281 0 3.417-3.348 5.63-7.313 5.63ZM142.833 36.512h-5.851V20.858c0-4.98 3.738-8.592 8.939-8.592 5.071 0 8.939 3.873 8.939 8.592 0 5.207-3.446 8.657-8.614 8.657-1.203 0-2.405-.358-3.413-.912v7.909Zm3.088-12.497c1.853 0 3.088-1.432 3.088-3.125 0-1.724-1.235-3.124-3.088-3.124s-3.088 1.4-3.088 3.125c0 1.692 1.235 3.124 3.088 3.124ZM131.121 11.03c-1.918 0-3.51-1.595-3.51-3.515 0-1.92 1.592-3.515 3.51-3.515 1.918 0 3.511 1.595 3.511 3.515 0 1.92-1.593 3.515-3.511 3.515Zm-2.925 1.724h5.851v16.273h-5.851V12.754ZM116.97 29.515c-5.071 0-8.939-3.905-8.939-8.657 0-4.719 3.868-8.624 8.939-8.624s8.939 3.905 8.939 8.624c0 4.752-3.868 8.657-8.939 8.657Zm0-5.5c1.853 0 3.088-1.432 3.088-3.125 0-1.724-1.235-3.156-3.088-3.156s-3.088 1.432-3.088 3.156c0 1.693 1.235 3.125 3.088 3.125ZM96.983 37c-4.03 0-6.956-1.79-8.451-4.98l4.843-2.603c.52 1.107 1.495 2.246 3.51 2.246 2.114 0 3.511-1.335 3.674-3.678-.78.684-2.016 1.204-3.868 1.204-4.519 0-8.16-3.482-8.16-8.364 0-4.718 3.869-8.559 8.94-8.559 5.201 0 8.939 3.613 8.939 8.592v6.444c0 5.858-4.064 9.698-9.427 9.698Zm.39-13.31c1.755 0 3.088-1.205 3.088-2.995 0-1.757-1.332-2.929-3.088-2.929-1.723 0-3.088 1.172-3.088 2.93 0 1.79 1.365 2.993 3.088 2.993ZM78.607 29.515c-5.071 0-8.94-3.905-8.94-8.657 0-4.719 3.869-8.624 8.94-8.624 5.07 0 8.939 3.905 8.939 8.624 0 4.752-3.869 8.657-8.94 8.657Zm0-5.5c1.853 0 3.088-1.432 3.088-3.125 0-1.724-1.235-3.156-3.088-3.156s-3.088 1.432-3.088 3.156c0 1.693 1.235 3.125 3.088 3.125ZM59.013 7.06v16.434H68.7v5.533H58.2c-3.705 0-5.2-1.953-5.2-5.045V7.06h6.013Z"></path></svg>
                    </Link>
                    <div className="flex flex-col py-8 overflow-hidden -mr-5 grow">
                        <div className='flex flex-col overflow-auto h-full pr-5'>
                            {
                                sideLinks?.map(link => (
                                    <Link href={link?.href} key={link?.href} className={`flex group/menu items-center sm:gap-3 gap-2 py-3 px-4 rounded-lg text-zinc-600 md:hover:text-white md:hover:bg-primary-500 dark:text-zinc-300 dark:md:hover:text-white dark:md:hover:bg-zinc-900 duration-300 font-medium`}>
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
                                    variant="solid" className='w-full font-medium xl:text-base text-sm bg-rose-100 text-rose-600 dark:bg-rose-600 dark:text-white' endContent={<LogoutIcon className="size-5" />} >
                                    Logout
                                </Button>
                            </div>

                </div>
            </div>
        </>
    )
}

export default SidebarAdmin