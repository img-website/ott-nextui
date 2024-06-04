"use client"
import { db } from "@/app/firebase/firebase";
import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody } from "@nextui-org/card";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import Loading from "@/app/(page)/categories/loading";

const CategoriesPage = () => {
    const [videoCategories, setVideoCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCategories = async () => {
        try {
            const collectionRef = collection(db, "category");
            const querySnapshot = await getDocs(collectionRef);
            const categories = querySnapshot.docs.map((doc) => doc.data());
            setVideoCategories(categories);
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        isLoading ? (
            <Loading />
        ) : (

            <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-3 gap-y-5 py-5">
                {videoCategories?.map((category) => (
                    <Card key={category.id}>
                        <CardBody>
                            <Button
                                className="h-auto py-4 font-bold justify-start"
                                as={Link}
                                startContent={
                                    <Avatar
                                        classNames={{
                                            base: "shrink-0"
                                        }}
                                        isBordered
                                        size="lg"
                                        src={category?.image}
                                    />

                                }
                                isExternal
                                href=""
                            >
                                <div className="flex flex-col gap-1">
                                    <span>{category?.categoryName}</span>
                                    <span>11 Videos</span>
                                </div>
                            </Button>
                        </CardBody>
                    </Card>
                ))}

            </div>
        )
    )
}

export default CategoriesPage