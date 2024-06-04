"use client"
import { Card } from '@nextui-org/card'
import { Skeleton } from '@nextui-org/skeleton'

const Loading = () => {

    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-3 gap-y-5 pt-8 pb-4">
            {
                Array.from({ length: 8 }).map((_, i) => (
                    <Card key={i} className="space-y-5 p-4 aspect-[10/17]">
                        <Skeleton className="rounded-lg">
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
    )
}

export default Loading