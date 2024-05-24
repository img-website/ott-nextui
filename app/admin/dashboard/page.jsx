"use client"
import AdminLayout from '@/app/_layouts/AdminLayout'
import { db } from '@/app/firebase/firebase';
import AdminAllCategoryTable from '@/components/adminAllCategoryTable';
import AdminAllStatusTable from '@/components/adminAllStatusTable';
import AdminAllVideosTable from '@/components/adminAllVideosTable';
import { CategoryIcon, ChevronDownIcon, TrendingIcon, VideoAddIcon } from '@/components/icons';
import ProtectedRoute from '@/components/protected/ProtectedRoute';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';
import React, { Suspense } from 'react'
import Loading from '@/app/admin/loading';

const DashboardPage = () => {
	const [allVideos, setAllVideos] = React.useState([])
	const [isVideosLoading, setIsVideosLoading] = React.useState(true)
	const [tatalVideoLength, setTatalVideoLength] = React.useState(0)
	const [allCategories, setAllCategories] = React.useState([])
	const [isCategoriesLoading, setIsCategoriesLoading] = React.useState(true)
	const [tatalCategoriesLength, setTatalCategoriesLength] = React.useState(0)
	const [allStatus, setAllStatus] = React.useState([])
	const [isStatusLoading, setIsStatusLoading] = React.useState(true)
	const [tatalStatusLength, setTatalStatusLength] = React.useState(0)


	const fetchData = async () => {
		try {
			setIsVideosLoading(true)
			const videosRef = collection(db, "allmemes");
			const q = query(videosRef, orderBy("createdAt", "desc"), limit(5));
			const querySnapshotTotal = await getDocs(videosRef);
			setTatalVideoLength(Math.ceil(querySnapshotTotal.docs.length))
			const querySnapshot = await getDocs(q);
			setAllVideos(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		} catch (error) {
			setIsVideosLoading(false)
			console.log(error);
		} finally {
			setIsVideosLoading(false)
		}


		try {
			setIsCategoriesLoading(true)
			const categoriesRef = collection(db, "category");
			const q = query(categoriesRef, orderBy("createdAt", "desc"), limit(5));
			const querySnapshotTotal = await getDocs(categoriesRef);
			setTatalCategoriesLength(Math.ceil(querySnapshotTotal.docs.length))
			const querySnapshot = await getDocs(q);
			setAllCategories(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		} catch (error) {
			setIsCategoriesLoading(false)
			console.log(error);
		} finally {
			setIsCategoriesLoading(false)
		}


		try {
			setIsStatusLoading(true)
			const statusRef = collection(db, "status");
			const q = query(statusRef, orderBy("createdAt", "desc"), limit(5));
			const querySnapshotTotal = await getDocs(statusRef);
			setTatalStatusLength(Math.ceil(querySnapshotTotal.docs.length))
			const querySnapshot = await getDocs(q);
			setAllStatus(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		} catch (error) {
			setIsStatusLoading(false)
			console.log(error);
		} finally {
			setIsStatusLoading(false)
		}
	}
	React.useEffect(() => {
		fetchData()
	}, [])

	return (
		<ProtectedRoute>
			<AdminLayout>
				<>
					<div className="overflow-x-hidden overflow-y-auto">
						<ul className="flex flex-nowrap overflow-x-auto overflow-y-hidden items-stretch -mx-3">
							<li className='w-1/3 max-md:min-w-72 p-3 relative group'>
								<div className="max-w-sm p-6 border rounded-lg shadow h-full text-zinc-600 dark:text-zinc-100 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
									<div className="flex justify-between items-center">
										<div className='font-extrabold text-3xl'>
											<Suspense fallback={<Loading />}>
												{tatalVideoLength}
											</Suspense>
										</div>
										<VideoAddIcon className='size-10 mb-3 text-primary dark:text-purple-500' />
									</div>
									<Link href="/admin/all-videos" className='before:absolute before:inset-0'>
										<h5 className="mb-4 text-xl font-semibold tracking-tight">All Videos</h5>
									</Link>
									<Link href="/admin/all-videos" className="inline-flex gap-2 font-medium items-center group-hover:underline">
										View More Videos
										<ChevronDownIcon className='size-6' />
									</Link>
								</div>
							</li>
							<li className='w-1/3 max-md:min-w-72 p-3 relative group'>
								<div className="max-w-sm p-6 border rounded-lg shadow h-full text-zinc-600 dark:text-zinc-100 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
									<div className="flex justify-between items-center">
										<div className='font-extrabold text-3xl'>
											<Suspense fallback={<Loading />}>
												{tatalCategoriesLength}
											</Suspense>
										</div>
										<CategoryIcon className='size-10 mb-3 text-primary dark:text-purple-500' />
									</div>
									<Link href="/admin/categories" className='before:absolute before:inset-0'>
										<h5 className="mb-4 text-xl font-semibold tracking-tight">All Categories</h5>
									</Link>
									<Link href="/admin/categories" className="inline-flex gap-2 font-medium items-center group-hover:underline">
										View More Categories
										<ChevronDownIcon className='size-6' />
									</Link>
								</div>
							</li>
							<li className='w-1/3 max-md:min-w-72 p-3 relative group'>
								<div className="max-w-sm p-6 border rounded-lg shadow h-full text-zinc-600 dark:text-zinc-100 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
									<div className="flex justify-between items-center">
										<div className='font-extrabold text-3xl'>
											<Suspense fallback={<Loading />}>
												{tatalStatusLength}
											</Suspense>
										</div>
										<TrendingIcon className='size-10 mb-3 text-primary dark:text-purple-500' />
									</div>
									<Link href="/admin/status" className='before:absolute before:inset-0'>
										<h5 className="mb-4 text-xl font-semibold tracking-tight">Status</h5>
									</Link>
									<Link href="/admin/status" className="inline-flex gap-2 font-medium items-center group-hover:underline">
										View More Status
										<ChevronDownIcon className='size-6' />
									</Link>
								</div>
							</li>
						</ul>
					</div>


					<Card className="w-full mt-5">
						<CardHeader className="flex gap-3">
							<VideoAddIcon className='size-5 mb-3 text-primary dark:text-purple-500' />
							<div className="flex flex-col">
								<p className="text-md">Latest Videos</p>
								<Link href={"/admin/all-videos"} className="text-small text-default-500">View all {tatalVideoLength} videos</Link>
							</div>
						</CardHeader>
						<Divider />
						<CardBody>
							<Suspense fallback={<Loading />}>
								<AdminAllVideosTable allVideos={allVideos} isLoading={isVideosLoading} fetchAllVideos={fetchData} hideFooter={true} hideTableLength={true} />
							</Suspense>
						</CardBody>
						<Divider />
					</Card>


					<Card className="w-full mt-5">
						<CardHeader className="flex gap-3">
							<CategoryIcon className='size-5 mb-3 text-primary dark:text-purple-500' />
							<div className="flex flex-col">
								<p className="text-md">Latest Categories</p>
								<Link href={"/admin/categories"} className="text-small text-default-500">View all {tatalCategoriesLength} categories</Link>
							</div>
						</CardHeader>
						<Divider />
						<CardBody>
							<Suspense fallback={<Loading />}>
								<AdminAllCategoryTable allCategories={allCategories} isLoading={isCategoriesLoading} fetchAllCategories={fetchData} hideFooter={true} hideTableLength={true} />
							</Suspense>
						</CardBody>
						<Divider />
					</Card>


					<Card className="w-full mt-5 mb-5">
						<CardHeader className="flex gap-3">
							<TrendingIcon className='size-5 mb-3 text-primary dark:text-purple-500' />
							<div className="flex flex-col">
								<p className="text-md">Latest Status</p>
								<Link href={"/admin/status"} className="text-small text-default-500">View all {tatalStatusLength} status</Link>
							</div>
						</CardHeader>
						<Divider />
						<CardBody>
							<Suspense fallback={<Loading />}>
								<AdminAllStatusTable allStatus={allStatus} isLoading={isStatusLoading} fetchAllStatus={fetchData} hideFooter={true} hideTableLength={true} />
							</Suspense>
						</CardBody>
						<Divider />
					</Card>
				</>
			</AdminLayout>
		</ProtectedRoute>
	)
}

export default DashboardPage