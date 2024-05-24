"use client"
import React from 'react'
import AdminLayout from '@/app/_layouts/AdminLayout'
import { getAllData } from '@/app/firebase/firebase';
import toast from 'react-hot-toast';
import AdminAllCategoryTable from '@/components/adminAllCategoryTable';
import ProtectedRoute from '@/components/protected/ProtectedRoute';

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
				<AdminAllCategoryTable allCategories={allCategories} setAllCategories={setAllCategories} fetchAllCategories={fetchAllCategories} isLoading={isLoading} />
			</AdminLayout>
		</ProtectedRoute>
	)
}

export default CategoriesPage