import AdminLayout from '@/app/_layouts/AdminLayout'
import { title } from '@/components/primitives'
import ProtectedRoute from '@/components/protected/ProtectedRoute'
import React from 'react'

const NotificationPage = () => {
	return (
		<ProtectedRoute>
			<AdminLayout>
				<div>
					<h1 className={title()}>Notification Page</h1>
				</div>
			</AdminLayout>
		</ProtectedRoute>
	)
}

export default NotificationPage