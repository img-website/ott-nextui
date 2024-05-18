import AdminLayout from '@/app/_layouts/AdminLayout'
import { title } from '@/components/primitives'
import ProtectedRoute from '@/components/protected/ProtectedRoute'
import React from 'react'

const ProfilePage = () => {
	return (
		<ProtectedRoute>
			<AdminLayout>
				<div>
					<h1 className={title()}>Profile Page</h1>
				</div>
			</AdminLayout>
		</ProtectedRoute>
	)
}

export default ProfilePage