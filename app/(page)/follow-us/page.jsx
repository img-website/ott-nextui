
import { FacebookIcon, InstagramIcon, MessengerIcon, TelegramIcon, YoutubeIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { Button } from "@nextui-org/button"
import { Card, CardBody } from "@nextui-org/card"
import Link from "next/link"

const FollowUSPage = () => {
    return (
        <Card className="max-w-5xl m-auto">
            <CardBody className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-10 md:gap-8 gap-5">

                <Button as={Link} href={siteConfig?.links?.facebook} className="text-white bg-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2">
                    <FacebookIcon className="size-6" />
                    Follow on Facebook
                </Button>
                <Button as={Link} href={siteConfig?.links?.instagram} className="text-white bg-gradient-to-tr from-blue-500 via-pink-800 to-orange-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2">
                    <InstagramIcon className="size-6" />
                    Follow on Instagram
                </Button>
                <Button as={Link} href={siteConfig?.links?.youtube} className="text-white bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2">
                    <YoutubeIcon className="size-6" />
                    Subscribe on Youtube
                </Button>
                <Button as={Link} href={siteConfig?.links?.telegram} className="text-white bg-sky-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2">
                    <TelegramIcon className="size-6" />
                    Join Us on Telegram
                </Button>
                <Button as={Link} href={siteConfig?.links?.instagram} className="text-white bg-gradient-to-tr from-blue-500 to-indigo-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2">
                    <MessengerIcon className="size-6" />
                    Join Us on Messenger
                </Button>

            </CardBody>

        </Card>
    )
}

export default FollowUSPage