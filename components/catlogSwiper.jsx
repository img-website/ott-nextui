"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import NextLink from 'next/link';
import { Button } from '@nextui-org/button';
import { Skeleton } from '@nextui-org/skeleton';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/app/firebase/firebase';

const CategorySwiper = () => {
    const [videoCategories, setVideoCategories] = useState([]);
    const [Loading, setLoading] = useState(true);

    const fetchCategories = async () => {
        try {
            const collectionRef = collection(db, "category");
            const querySnapshot = await getDocs(collectionRef);
            const categories = querySnapshot.docs.map((doc) => doc.data()?.categoryName);
            setVideoCategories(categories);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        Loading ? (
            <div className="flex overflow-hidden gap-2 items-center pt-1">
                <Skeleton className="rounded-lg shrink-0">
                    <div className="h-10 w-32 rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="rounded-lg shrink-0">
                    <div className="h-10 w-16 rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="rounded-lg shrink-0">
                    <div className="h-10 w-28 rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="rounded-lg shrink-0">
                    <div className="h-10 w-36 rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="rounded-lg shrink-0">
                    <div className="h-10 w-24 rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="rounded-lg shrink-0">
                    <div className="h-10 w-52 rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="rounded-lg shrink-0">
                    <div className="h-10 w-14 rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="rounded-lg shrink-0">
                    <div className="h-10 w-40 rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="rounded-lg shrink-0">
                    <div className="h-10 w-16 rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="rounded-lg shrink-0">
                    <div className="h-10 w-20 rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="rounded-lg shrink-0">
                    <div className="h-10 w-16 rounded-lg bg-default-300"></div>
                </Skeleton>
            </div>
        )
            :
            (
                <Swiper
                    className='
                    w-full !py-1
                    max-sm:[&_.swiper-button-prev]:hidden [&_.swiper-button-prev]:bg-gradient-to-r [&_.swiper-button-prev]:from-white [&_.swiper-button-prev]:via-white [&_.swiper-button-prev]:dark:from-zinc-950 [&_.swiper-button-prev]:dark:via-zinc-950 [&_.swiper-button-prev]:left-0 [&_.swiper-button-prev]:!pr-10 [&_.swiper-button-prev]:!pl-5 after:[&_.swiper-button-prev]:content-["prev"] after:[&_.swiper-button-prev]:!text-lg after:[&_.swiper-button-prev]:!font-bold after:[&_.swiper-button-prev]:text-default-600 after:[&_.swiper-button-prev]:dark:text-default-500
                    
                    max-sm:[&_.swiper-button-next]:hidden [&_.swiper-button-next]:bg-gradient-to-l [&_.swiper-button-next]:from-white [&_.swiper-button-next]:via-white [&_.swiper-button-next]:dark:from-zinc-950 [&_.swiper-button-next]:dark:via-zinc-950 [&_.swiper-button-next]:right-0 [&_.swiper-button-next]:!pl-10 [&_.swiper-button-next]:!pr-5 after:[&_.swiper-button-next]:content-["next"] after:[&_.swiper-button-next]:!text-lg after:[&_.swiper-button-next]:!font-bold after:[&_.swiper-button-next]:text-default-600 after:[&_.swiper-button-next]:dark:text-default-500

                    [&_.swiper-button-disabled]:hidden
                '
                    navigation={{ clickable: true }}
                    modules={[Navigation]}
                    spaceBetween={10}
                    slidesPerView={'auto'}
                >
                    {videoCategories?.map((category, index) => (
                        <SwiperSlide key={index} className='!w-auto'>
                            <Button as={NextLink} href={''} className='bg-sky-100 dark:bg-default-100 sm:text-base text-sm max-sm:font-semibold sm:p-2 p-1 rounded-md h-auto min-w-12'>
                                {category}
                            </Button>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )
    )
}

export default CategorySwiper