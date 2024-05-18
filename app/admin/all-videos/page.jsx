"use client"
import AdminLayout from '@/app/_layouts/AdminLayout'
import { getAllData } from '@/app/firebase/firebase';
import AdminAllVideosTable from '@/components/adminAllVideosTable'
import ProtectedRoute from '@/components/protected/ProtectedRoute';
import React from 'react';

const AllVideosPage = () => {
	const [allVideos, setAllVideos] = React.useState([]);

	const fetchAllVideos = async () => {
		try {
			const videoData = await getAllData('allmemes');
			setAllVideos(videoData);
		} catch (error) {
			toast.error(error?.message)
		}
	}

	React.useEffect(() => {
		fetchAllVideos();
	}, [])
	return (
		<ProtectedRoute>
			<AdminLayout>
				<AdminAllVideosTable allVideos={allVideos} fetchAllVideos={fetchAllVideos} />
			</AdminLayout>
		</ProtectedRoute>
	)
}

export default AllVideosPage