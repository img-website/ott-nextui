"use client"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown'
import React from 'react'
import { ForwardIcon, VerticalDotsIcon, VideoAddIcon } from '@/components/icons'
import { Button } from '@nextui-org/button'
import { Card, CardBody } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import NextImage from 'next/image'
import Link from 'next/link'

const VideoCardsSection = ({ content, sectionName, className }) => {
    const Data = content || [
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
    ]
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
                    Data?.map((item) => (
                        <Card key={item?.id} as={"li"}>
                            <CardBody as={Link} href={item?.url} target="_blank" className="overflow-hidden">
                                <Image
                                    classNames={{
                                        wrapper: "!max-w-full aspect-[9/13] *:h-full",
                                        img: "w-full h-full object-cover object-center",
                                    }}
                                    as={NextImage}
                                    isBlurred
                                    isZoomed
                                    width={900}
                                    height={1300}
                                    src={item?.img}
                                    alt={item?.title}
                                />
                                <div>
                                    <div className="flex items-start justify-between pt-2">
                                        <disv className="md:text-sm text-xs font-normal text-default-700 dark:text-default-600 line-clamp-2">{item?.title}</disv>
                                        <div className="flex items-center gap-2">
                                            <Dropdown>
                                                <DropdownTrigger>
                                                    <Button
                                                        variant="flat"
                                                        size="sm"
                                                        className="min-w-0 px-2"
                                                    >
                                                        <VerticalDotsIcon className="size-5" />
                                                    </Button>
                                                </DropdownTrigger>
                                                <DropdownMenu aria-label="Video Actions">
                                                    <DropdownItem key="share">Share link</DropdownItem>
                                                    <DropdownItem key="copy">Copy link</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ))
                }
            </ul>
        </div>
    )
}

export default VideoCardsSection