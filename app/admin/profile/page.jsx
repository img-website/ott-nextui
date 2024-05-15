import AdminLayout from '@/app/_layouts/AdminLayout'
import { title } from '@/components/primitives'
import React from 'react'

const ProfilePage = () => {
    return (
		<AdminLayout>
			<div>
				<h1 className={title()}>Profile Page</h1>
			</div>
		</AdminLayout>
    )
}

export default ProfilePage