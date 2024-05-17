"use client"
import React from 'react'
import AdminLayout from '@/app/_layouts/AdminLayout'
import { getAllData } from '@/app/firebase/firebase';
import AdminAllStatusTable from '@/components/adminAllStatusTable'
import toast from 'react-hot-toast';

const StatusPage = () => {
	const [allStatus, setAllStatus] = React.useState([]);

	const fetchAllStatus = async () => {
		try {
			const statusData = await getAllData('status');
			setAllStatus(statusData);
			// console.info(statusData);
		} catch (error) {
			toast.error(error.message)
		}
	}

	React.useEffect(() => {
		fetchAllStatus();
	}, [])
	return (
		<AdminLayout>
			<AdminAllStatusTable allStatus={allStatus} fetchAllStatus={fetchAllStatus} />
		</AdminLayout>
	)
}

export default StatusPage