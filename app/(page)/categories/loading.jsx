"use client"
import { Card, CardBody } from '@nextui-org/card'
import { Skeleton } from '@nextui-org/skeleton'

const Loading = () => {

    return (
        <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-3 gap-y-5 py-5">
            {
                Array.from({ length: 12 }).map((_, i) => (
                    <Card key={i}>
                        <CardBody>
                            <Skeleton className="rounded-lg">
                                <div className="h-20 w-full rounded-lg bg-default-300"></div>
                            </Skeleton>
                        </CardBody>
                    </Card>
                ))
            }
        </div>
    )
}

export default Loading