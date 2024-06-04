"use client"
import { Suspense } from "react"
import VideoCardsSection from "@/components/videoCardsSection"
import useAllActiveVideosByNew from "@/hooks/useAllActiveVideosByNew";
import Loading from '@/app/(page)/new-shorts/loading'

const NewShortsPage = () => {
    const { data, isLoading, error } = useAllActiveVideosByNew();
    
    return (
        <Suspense fallback={<Loading />}>
            <VideoCardsSection className={"pt-8 pb-4"} content={data} isLoading= {isLoading} error={error} />
        </Suspense>
    )
}

export default NewShortsPage