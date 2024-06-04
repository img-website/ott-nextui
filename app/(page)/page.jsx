"use client"
import { Suspense } from "react"
// import CategorySwiper from "@/components/catlogSwiper"
import VideoCardsSection from "@/components/videoCardsSection"
import { TrendingIcon, VideoAddIcon } from "@/components/icons"
import useAllActiveVideosByNew from "@/hooks/useAllActiveVideosByNew";
import Loading from "@/app/(page)/loading"
// import { Skeleton } from "@nextui-org/skeleton"

const HomePage = () => {
    const { data:newData, isLoading:isLoadingNew, error:errorNew } = useAllActiveVideosByNew(8);
    return (
        <>
            {/* <Suspense fallback={
                <div className="flex overflow-hidden gap-2 items-center pt-12 pb-4">
                    <Skeleton className="rounded-lg shrink-0">
                        <div className="h-8 w-32 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <Skeleton className="rounded-lg shrink-0">
                        <div className="h-8 w-16 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <Skeleton className="rounded-lg shrink-0">
                        <div className="h-8 w-28 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <Skeleton className="rounded-lg shrink-0">
                        <div className="h-8 w-36 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <Skeleton className="rounded-lg shrink-0">
                        <div className="h-8 w-24 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <Skeleton className="rounded-lg shrink-0">
                        <div className="h-8 w-52 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <Skeleton className="rounded-lg shrink-0">
                        <div className="h-8 w-14 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <Skeleton className="rounded-lg shrink-0">
                        <div className="h-8 w-40 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <Skeleton className="rounded-lg shrink-0">
                        <div className="h-8 w-16 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <Skeleton className="rounded-lg shrink-0">
                        <div className="h-8 w-20 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <Skeleton className="rounded-lg shrink-0">
                        <div className="h-8 w-16 rounded-lg bg-default-300"></div>
                    </Skeleton>
                </div>
            }>
                <div
                    className="bg-white dark:bg-zinc-950 pb-2">
                    <CategorySwiper />
                </div>
            </Suspense> */}
            <Suspense fallback={<Loading />}>
                {
                    isLoadingNew ?
                        <Loading />
                        :
                        <VideoCardsSection content={newData} limit={8} sectionName={{
                            icon: VideoAddIcon,
                            title: "New Shorts",
                            url: "/new-shorts"
                        }} />
                }
            </Suspense>
            {/* <Suspense fallback={<Loading />}>
                {
                    isLoading ?
                        <Loading />
                        :
                        <VideoCardsSection className={"pt-8 pb-4"} content={data} limit={8} sectionName={{
                            icon: TrendingIcon,
                            title: "All Trending",
                            url: "/trending"
                        }} />
                }
            </Suspense> */}
        </>
    )
}

export default HomePage