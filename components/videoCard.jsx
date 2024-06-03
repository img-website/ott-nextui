"use client"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown'
import React, { useEffect, useState } from 'react'
import { VerticalDotsIcon } from '@/components/icons'
import { Button } from '@nextui-org/button'
import { Card, CardBody } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import NextImage from 'next/image'
import Link from 'next/link'
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '@/app/firebase/firebase'
import { useAppContext } from '@/context'
import UserDetails from '@/utils/_userDetails'

const VideoCard = ({ item, shareUrl }) => {
    const [uid, setUid] = useState('')
    const {credential} = useAppContext()
    const [change, setChange] = useState(false)

    console.log('credential', credential)

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
        if(isFavorite) {
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
        console.log('credential refreshed')
        return <UserDetails change={change}/>
        
    }


    const getActiveClassName = (id) => {
        const item = credential?.favoriteVideos?.filter(elem => elem === id)
        console.log('item favvv', item)
        if (item?.length) {
            return 'Remove from favorites'
        } else {
            return 'Add to favorites'
        }
    }



    return (
        <>
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
                                    <DropdownItem key="wishlist"  onClick={() => { favoriteHandler(item?.id) }}>
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
        </Card>
        {refreshUserDetails()}
        </>
    )
}

export default VideoCard