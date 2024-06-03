"use client"
import { Suspense } from "react"
import VideoCardsSection from "@/components/videoCardsSection"
import useAllActiveMemes from "@/hooks/useAllActiveMemes";
import Loading from '@/app/(page)/all-videos/loading'

const AllVideosPage = () => {
    const { data, isLoading, error } = useAllActiveMemes();
    
    return (
        <Suspense fallback={<Loading />}>
            <VideoCardsSection className={"pt-8 pb-4"} content={data} isLoading= {isLoading} error={error} />
        </Suspense>
    )
}

export default AllVideosPage