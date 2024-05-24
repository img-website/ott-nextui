import { Spinner } from '@nextui-org/spinner'
import React from 'react'

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300">
            <Spinner size="xl" label="Loading..."
                classNames={
                    {
                        circle1: 'border-b-primary dark:border-b-secondary',
                        circle2: 'border-b-primary dark:border-b-secondary',
                    }
                }
            />
        </div>
    )
}

export default Loading