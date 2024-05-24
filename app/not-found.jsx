import { Button } from '@nextui-org/button'
import Link from 'next/link'
import React from 'react'

const NotFound404 = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <div className='text-xl font-bold'>
                Page Not Found
            </div>
            <div className='text-base pb-5'>
                The page you are looking for does not exist.
            </div>
            <Link href="/">
                <Button size="lg" color="primary">
                    Go to Home
                </Button>
            </Link>
        </div>
    )
}

export default NotFound404