"use client"
import AdminLayout from '@/app/_layouts/AdminLayout'
import { getAllData } from '@/app/firebase/firebase';
import AdminAllVideosTable from '@/components/adminAllVideosTable'
import ProtectedRoute from '@/components/protected/ProtectedRoute';
import React from 'react';

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
				<AdminAllVideosTable allVideos={allVideos} fetchAllVideos={fetchAllVideos} isLoading={isLoading} />
			</AdminLayout>
		</ProtectedRoute>
	)
}

export default AllVideosPage