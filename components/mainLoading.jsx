"use client"
import { useLoadingContext } from '@/context/loading'
import { Spinner } from '@nextui-org/spinner'
import React from 'react'

const MainLoading = () => {
    const { isLoading, loadingText } = useLoadingContext();
    return (
        isLoading &&
        <div className='fixed inset-0 z-50 flex items-center justify-center !duraion-300 transition-background bg-white dark:bg-black bg-opacity-50 backdrop-blur-2xl'>
            <div className="w-full h-full flex items-center justify-center">
                <Spinner classNames={{
                    circle1: "border-b-sky-700 dark:border-b-default-600",
                    circle2: "border-b-sky-700 dark:border-b-default-600",
                    label: "text-default-900 dark:text-default-600 font-semibold"
                }}
                    label={loadingText || 'Loading...'} />
            </div>
        </div>
    )
}

export default MainLoading