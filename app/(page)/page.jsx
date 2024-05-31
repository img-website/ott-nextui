"use client"
import { Suspense } from "react"
import CategorySwiper from "@/components/catlogSwiper"
import VideoCardsSection from "@/components/videoCardsSection"
import { TrendingIcon, VideoAddIcon } from "@/components/icons"

const HomePage = () => {
    const content = [
        {
            id: '1',
            title: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque nulla ab eveniet incidunt",
            img: "https://source.unsplash.com/random/900x1300/?city,night",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        },
        {
            id: '2',
            title: "adipisicing elit. Eaque nulla ab eveniet incidunt",
            img: "https://source.unsplash.com/random/900x1300/?city,day",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        },
        {
            id: '3',
            title: "adipisicing elit. Eaque nulla ab eveniet incidunt",
            img: "https://source.unsplash.com/random/900x1300/?road,day",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        },
        {
            id: '4',
            title: "adipisicing elit. Eaque nulla ab eveniet incidunt",
            img: "https://source.unsplash.com/random/900x1300/?road,night",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        },
        {
            id: '5',
            title: "adipisicing elit. Eaque nulla ab eveniet incidunt",
            img: "https://source.unsplash.com/random/900x1300/?nature,night",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        },
        {
            id: '6',
            title: "adipisicing elit. Eaque nulla ab eveniet incidunt",
            img: "https://source.unsplash.com/random/900x1300/?nature,day",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        },
        {
            id: '7',
            title: "adipisicing elit. Eaque nulla ab eveniet incidunt",
            img: "https://source.unsplash.com/random/900x1300/?nature,road",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        },
        {
            id: '8',
            title: "adipisicing elit. Eaque nulla ab eveniet incidunt",
            img: "https://source.unsplash.com/random/900x1300/?day,road",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        },
    ]
    return (
        <>
            <Suspense fallback={"CategorySwiper loading..."}>
                <div className="sticky top-0 z-30 bg-white dark:bg-zinc-950 pb-2">
                    <CategorySwiper />
                </div>
            </Suspense>
            <Suspense fallback={"VideoCardsSection loading..."}>
                <VideoCardsSection content={content} sectionName={{
                    icon: VideoAddIcon,
                    title: "New Shorts",
                    url: "/new-shorts"
                }} />
            </Suspense>
            <Suspense fallback={"VideoCardsSection loading..."}>
                <VideoCardsSection className={"pt-8 pb-4"} content={content} sectionName={{
                    icon: TrendingIcon,
                    title: "All Trending",
                    url: "/trending"
                }} />
            </Suspense>
        </>
    )
}

export default HomePage