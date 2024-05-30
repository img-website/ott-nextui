"use client"
import { Tab, Tabs } from '@nextui-org/tabs'
import { CategoryIcon, DashboardIcon, TrendingIcon, VideoAddIcon } from '@/components/icons'

const MobileFooter = () => {
    return (
        <div className="lg:hidden flex w-full flex-col">
            <Tabs
                aria-label="Options"
                color="primary"
                variant="underlined"
                classNames={{
                    tabList: "w-full relative rounded-none p-0 border-b border-divider",
                    cursor: "w-full bg-sky-500 dark:bg-sky-400",
                    tab: "grow px-0 h-12",
                    tabContent: "group-data-[selected=true]:text-sky-600 dark:group-data-[selected=true]:text-white font-semibold text-xs"
                }}
            >
                <Tab
                    key="home"
                    title={
                        <div className="flex items-center flex-col">
                            <DashboardIcon className="size-5" />
                            <span>Home</span>
                        </div>
                    }
                />
                <Tab
                    key="category"
                    title={
                        <div className="flex items-center flex-col">
                            <CategoryIcon className="size-5" />
                            <span>Catlog</span>
                        </div>
                    }
                />
                <Tab
                    key="videos"
                    title={
                        <div className="flex items-center flex-col">
                            <VideoAddIcon className="size-5" />
                            <span>Videos</span>
                        </div>
                    }
                />
                <Tab
                    key="status"
                    title={
                        <div className="flex items-center flex-col">
                            <TrendingIcon className="size-5" />
                            <span>Status</span>
                        </div>
                    }
                />
            </Tabs>
        </div>
    )
}

export default MobileFooter