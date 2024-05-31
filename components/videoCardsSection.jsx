import React from 'react'
import { ForwardIcon } from '@/components/icons'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import VideoCard from '@/components/videoCard'

const VideoCardsSection = ({ content, sectionName, className }) => {
    return (
        <div className={`pt-3 flex flex-col gap-3 ${className}`}>
            <div className="flex items-center gap-2 text-default-600 dark:text-default-600 font-semibold md:text-lg text-base">
                {sectionName?.icon && <sectionName.icon className="md:size-6 size-5 text-sky-600 dark:text-default-600" />}
                {sectionName?.title || "Video Cards"}
                <Button
                    as={Link}
                    href={sectionName?.url || "/"}
                    variant="flat"
                    size="sm"
                    className="min-w-0 px-2 max-md:ml-auto"
                >
                    View All <ForwardIcon className="size-4" />
                </Button>
            </div>

            <ul className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-3 gap-y-5">
                {
                    content?.map((item) => (
                        <VideoCard key={item.id} item={item} />
                    ))
                }
            </ul>
        </div>
    )
}

export default VideoCardsSection