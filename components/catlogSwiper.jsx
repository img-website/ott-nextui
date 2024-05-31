"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Suspense } from 'react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import NextLink from 'next/link';
import { Button } from '@nextui-org/button';

const videoCategories = [
    "All",
    "Entertainment",
    "News & Politics",
    "Sports",
    "Education & Science",
    "Tech & Gaming",
    "Lifestyle",
    "People & Blogs",
    "Animals & Pets",
    "Music",
    "Movies & Shows",
    "Comedy",
    // Add more categories as needed
];

const CategorySwiper = () => {
    return (
        <Suspense fallback={"Swiper loading..."}>
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
        </Suspense>
    )
}

export default CategorySwiper