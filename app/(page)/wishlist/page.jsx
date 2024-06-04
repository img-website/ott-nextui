"use client"
import { Suspense, useEffect, useState } from "react"
import Loading from "@/app/(page)/wishlist/loading"
import useAllActiveMemes from "@/hooks/useAllActiveMemes";
import { HeartFilledIcon, VerticalDotsIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import UserDetails from "@/utils/_userDetails";
import { useAppContext } from "@/context";
import { NextImage } from "next/image"
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";

const WishlistPage = () => {
    const { data, isLoading, error } = useAllActiveMemes();
    function shareUrl(url) {
        navigator.clipboard.writeText(url)
            .then(() => {
                console.log('URL copied to clipboard!');
            })
            .catch(() => {
                console.error('Failed to copy URL to clipboard!');
            });
    }
    const [uid, setUid] = useState('')
    const { credential } = useAppContext()
    const [change, setChange] = useState(false)

    useEffect(() => {
        const getUid = localStorage.getItem('uid');
        setUid(getUid);
    }, []);

    const favoriteHandler = async (videoId) => {

        const snapshot = await getDocs(query(collection(db, 'users'), where('uid', '==', uid)));
        const docID = snapshot.docs[0].id;

        const signedInUser = snapshot.docs[0].data();

        const userFavorites = signedInUser.favoriteVideos || [];

        const isFavorite = userFavorites.includes(videoId);

        // Remove the videoId from the user's favoriteVideos array
        if (isFavorite) {
            const updatedFavorites = userFavorites.filter((id) => id !== videoId);
            const docRef = doc(db, "users", docID);
            await updateDoc(docRef, {
                favoriteVideos: updatedFavorites
            });
            setChange(!change)
            refreshUserDetails()
            return
        }

        // Add the videoId to the user's favoriteVideos array
        const docRef = doc(db, "users", docID);

        // Set the "favoriteVideos" field of the city 'DC'
        await updateDoc(docRef, {
            favoriteVideos: [videoId, ...userFavorites]
        });
        setChange(!change)
        refreshUserDetails()
    };


    const refreshUserDetails = () => {
        return <UserDetails change={change} />

    }


    const getActiveClassName = (id) => {
        const item = credential?.favoriteVideos?.filter(elem => elem === id)
        if (item?.length) {
            return 'Remove from favorites'
        } else {
            return 'Add to favorites'
        }
    }

    const dataPrint = (id) => {
        const item = credential?.favoriteVideos?.filter(elem => elem === id)
        if (item?.length) {
            return true
        } else {
            return false
        }
    }

    return (
        <Suspense fallback={<Loading />}>
            {
                !isLoading ?
                    <div className="pt-3 flex flex-col gap-3 grow group">

                        <ul className="group-has-[li]:grid group-has-[li]:lg:grid-cols-4 group-has-[li]:md:grid-cols-3 group-has-[li]:grid-cols-2 group-has-[li]:gap-x-3 group-has-[li]:gap-y-5 group-has-[li]:grow-0 group-has-[li]:items-start group-has-[li]:justify-start flex flex-col grow items-center justify-center">
                            {
                                data?.map((item) => (
                                    dataPrint(item?.id) ?
                                        <Card as={"li"} key={item?.id}>
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
                                                                    <DropdownItem key="wishlist" onClick={() => { favoriteHandler(item?.id) }}>
                                                                        {
                                                                            getActiveClassName(item?.id)
                                                                        }
                                                                    </DropdownItem>
                                                                    <DropdownItem key="copy" onClick={() => shareUrl(item?.url)}>Copy link</DropdownItem>
                                                                    <DropdownItem key="share">Share link</DropdownItem>
                                                                </DropdownMenu>
                                                            </Dropdown>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardBody>
                                            {refreshUserDetails()}
                                        </Card>
                                        :
                                        <></>
                                ))
                            }
                            <div className="emptyState flex flex-col items-center justify-center group-has-[li]:!hidden">
                                <HeartFilledIcon className="size-10 text-default-300 dark:text-default-500" />
                                <p className="text-lg font-medium text-default-300 dark:text-default-500">Your Wishlist is Empty</p>
                                <p className="text-default-300 dark:text-default-500 text-center">Save items you like to your wishlist to view them later or share them with friends.</p>
                                <Button variant="flat" as={Link} href="/all-videos" className="font-medium mt-4">Watch Videos</Button>
                            </div>
                        </ul>
                    </div>
                    :
                    <Loading />
            }
        </Suspense>
    )
}

export default WishlistPage