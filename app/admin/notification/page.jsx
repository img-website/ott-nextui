import AdminLayout from '@/app/_layouts/AdminLayout'
import { title } from '@/components/primitives'
import React from 'react'

const NotificationPage = () => {
    return (
		<AdminLayout>
			<div>
				<h1 className={title()}>Notification Page</h1>
			</div>
		</AdminLayout>
    )
}

export default NotificationPage