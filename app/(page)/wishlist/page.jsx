"use client"
import { Suspense } from "react"
import Loading from "@/app/(page)/wishlist/loading"
import VideoCardsSection from "@/components/videoCardsSection"
import useAllActiveMemes from "@/hooks/useAllActiveMemes";

const WishlistPage = () => {
    const { data, isLoading, error } = useAllActiveMemes();
    return (
        <Suspense fallback={<Loading />}>
            <VideoCardsSection className={"pt-8 pb-4"} content={data} isLoading={isLoading} error={error} />
        </Suspense>
    )
}

export default WishlistPage