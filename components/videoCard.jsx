import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown'
import React from 'react'
import { VerticalDotsIcon } from '@/components/icons'
import { Button } from '@nextui-org/button'
import { Card, CardBody } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import NextImage from 'next/image'
import Link from 'next/link'

const VideoCard = ({ item, shareUrl }) => {
    return (
        <Card as={"li"}>
            <CardBody className="overflow-hidden">
                <Image
                    classNames={{
                        wrapper: "!max-w-full aspect-[9/13] *:h-full",
                        img: "w-full h-full object-cover object-center",
                    }}
                    priority
                    as={NextImage}
                    isBlurred
                    isZoomed
                    width={900}
                    height={1300}
                    src={item?.image}
                    alt={item?.title}
                />
                <div>
                    <div className="flex items-start justify-between pt-2">
                        <Link href={item?.url} target="_blank" className="md:text-sm text-xs font-normal text-default-700 dark:text-default-600 line-clamp-2 after:inset-0 after:absolute">{item?.title}</Link>
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
                                    <DropdownItem key="wishlist">Add Favorite</DropdownItem>
                                    <DropdownItem key="copy" onClick={() => shareUrl(item?.url)}>Copy link</DropdownItem>
                                    <DropdownItem key="share">Share link</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default VideoCard