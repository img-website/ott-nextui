"use client"
import { Tab, Tabs } from '@nextui-org/tabs'
import { siteConfig } from '@/config/site'
import { usePathname } from 'next/navigation'

const MobileFooter = () => {
    const pathname = usePathname();
    return (
        <div className="lg:hidden flex w-full flex-col">
            <Tabs
                aria-label="Options"
                color="primary"
                variant="underlined"
                items={siteConfig?.mobileBottomNavItems}
                selectedKey={pathname}
                classNames={{
                    tabList: "w-full relative rounded-none p-0 border-b border-divider",
                    cursor: "w-full bg-sky-500 dark:bg-sky-400",
                    tab: "grow px-0 h-12",
                    tabContent: "group-data-[selected=true]:text-sky-600 dark:group-data-[selected=true]:text-white font-semibold text-xs"
                }}
            >
                {(item) => (
                    <Tab
                        key={item?.id}
                        href={item?.href}
                        title={
                            <div className="flex items-center flex-col">
                                <item.icon className="size-5" />
                                <span>{item?.label}</span>
                            </div>
                        }
                    />
                )}
            </Tabs>
        </div>
    )
}

export default MobileFooter