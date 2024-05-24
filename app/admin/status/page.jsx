"use client"
import React, { Suspense } from 'react'
import AdminLayout from '@/app/_layouts/AdminLayout'
import { getAllData } from '@/app/firebase/firebase';
import AdminAllStatusTable from '@/components/adminAllStatusTable'
import toast from 'react-hot-toast';
import ProtectedRoute from '@/components/protected/ProtectedRoute';
import Loading from '@/app/admin/loading';

const StatusPage = () => {
	const [allStatus, setAllStatus] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	const fetchAllStatus = async () => {
		setIsLoading(true);
		try {
			const statusData = await getAllData('status');
			setAllStatus(statusData);
		} catch (error) {
			toast.error(error.message)
		} finally {
			setIsLoading(false);
		}
	}

	React.useEffect(() => {
		fetchAllStatus();
	}, [])
	return (
		<ProtectedRoute>
			<AdminLayout>
				<Suspense fallback={<Loading />}>
					<AdminAllStatusTable allStatus={allStatus} fetchAllStatus={fetchAllStatus} isLoading={isLoading} />
				</Suspense>
			</AdminLayout>
		</ProtectedRoute>
	)
}

export default StatusPage