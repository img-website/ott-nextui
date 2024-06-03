"use client"
import { Card } from '@nextui-org/card'
import { Skeleton } from '@nextui-org/skeleton'

const Loading = () => {

    return (
        <>
            <div className="flex overflow-hidden gap-2 items-center pt-5">
                <Skeleton className="rounded-lg shrink-0">
                    <div className="md:h-8 h-6 md:w-8 w-6 rounded-full bg-default-300"></div>
                </Skeleton>
                <Skeleton className="rounded-lg shrink-0">
                    <div className="md:h-8 h-6 md:w-32 w-12 rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="rounded-lg shrink-0">
                    <div className="md:h-7 h-5 md:w-10 w-6 rounded-lg bg-default-300"></div>
                </Skeleton>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-3 gap-y-5 pt-2">
                {
                    Array.from({ length: 4 }).map((_, i) => (
                        <Card key={i} className="space-y-5 p-4 aspect-[10/17]">
                            <Skeleton className="rounded-lg shrink-0">
                                <div className="h-24 rounded-lg bg-default-300"></div>
                            </Skeleton>
                            <div className="space-y-3">
                                <Skeleton className="w-3/5 rounded-lg">
                                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                                </Skeleton>
                                <Skeleton className="w-4/5 rounded-lg">
                                    <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                                </Skeleton>
                                <Skeleton className="w-2/5 rounded-lg">
                                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                                </Skeleton>
                            </div>
                        </Card>
                    ))
                }
            </div>
        </>
    )
}

export default Loading