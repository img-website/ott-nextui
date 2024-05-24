"use client"
import React, { Suspense } from 'react'
import AdminLayout from '@/app/_layouts/AdminLayout'
import { getAllData } from '@/app/firebase/firebase';
import toast from 'react-hot-toast';
import AdminAllCategoryTable from '@/components/adminAllCategoryTable';
import ProtectedRoute from '@/components/protected/ProtectedRoute';
import Loading from '@/app/admin/loading';

const CategoriesPage = () => {
	const [allCategories, setAllCategories] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	const fetchAllCategories = async () => {
		setIsLoading(true);
		try {
			const categoriesData = await getAllData('category');
			setAllCategories(categoriesData);
		} catch (error) {
			toast.error(error.message)
		} finally {
			setIsLoading(false);
		}
	}

	React.useEffect(() => {
		fetchAllCategories();
	}, [])
	return (
		<ProtectedRoute>
			<AdminLayout>
				<Suspense fallback={<Loading />}>
					<AdminAllCategoryTable allCategories={allCategories} setAllCategories={setAllCategories} fetchAllCategories={fetchAllCategories} isLoading={isLoading} />
				</Suspense>
			</AdminLayout>
		</ProtectedRoute>
	)
}

export default CategoriesPage