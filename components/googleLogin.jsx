import { Button } from '@nextui-org/button'
import React from 'react'
import { GoogleIcon } from './icons'

const GoogleLogin = () => {
    return (
        <Button
            className="text-sm font-semibold text-zinc-900 dark:text-white bg-sky-100 dark:bg-default-100"
            href=""
            startContent={<GoogleIcon className="sm:size-5 size-4 text-sky-600 dark:text-white" />}
            variant="flat"
        >
            Signin
        </Button>
    )
}

export default GoogleLogin