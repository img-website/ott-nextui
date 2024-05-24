"use client"
import AdminLayout from '@/app/_layouts/AdminLayout'
import { getAllData } from '@/app/firebase/firebase';
import AdminAllVideosTable from '@/components/adminAllVideosTable'
import ProtectedRoute from '@/components/protected/ProtectedRoute';
import React, { Suspense } from 'react';
import Loading from '@/app/admin/loading';


const AllVideosPage = () => {
	const [allVideos, setAllVideos] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	const fetchAllVideos = async () => {
		setIsLoading(true);
		try {
			const videoData = await getAllData('allmemes');
			setAllVideos(videoData);
		} catch (error) {
			toast.error(error?.message)
		} finally {
			setIsLoading(false);
		}
	}

	React.useEffect(() => {
		fetchAllVideos();
	}, [])



	return (
		<ProtectedRoute>
			<AdminLayout>
				<Suspense fallback={<Loading/>}>
					<AdminAllVideosTable allVideos={allVideos} fetchAllVideos={fetchAllVideos} isLoading={isLoading} />
				</Suspense>
			</AdminLayout>
		</ProtectedRoute>
	)
}

export default AllVideosPage