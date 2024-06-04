import { Card, CardBody } from '@nextui-org/card'
import { Skeleton } from '@nextui-org/skeleton'

const Loading = () => {
    return (
        <Card className="max-w-5xl w-full m-auto">
            <CardBody className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-10 md:gap-8 gap-5">
                <Skeleton className="rounded-lg mb-2">
                    <div className="h-10 w-full rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="rounded-lg mb-2">
                    <div className="h-10 w-full rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="rounded-lg mb-2">
                    <div className="h-10 w-full rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="rounded-lg mb-2">
                    <div className="h-10 w-full rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="rounded-lg mb-2">
                    <div className="h-10 w-full rounded-lg bg-default-300"></div>
                </Skeleton>
            </CardBody>
        </Card>
    )
}

export default Loading