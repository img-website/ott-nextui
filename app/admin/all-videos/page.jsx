import AdminLayout from '@/app/_layouts/AdminLayout'
import AdminAllVideosTable from '@/components/adminAllVideosTable'

const AllVideosPage = () => {
	return (
		<AdminLayout>
			<AdminAllVideosTable />
		</AdminLayout>
	)
}

export default AllVideosPage