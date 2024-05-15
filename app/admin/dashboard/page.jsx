import AdminLayout from '@/app/_layouts/AdminLayout'
import { title } from '@/components/primitives'
import React from 'react'

const DashboardPage = () => {
    return (
		<AdminLayout>
			<div>
				<h1 className={title()}>Dashboard Page</h1>
			</div>
		</AdminLayout>
    )
}

export default DashboardPage