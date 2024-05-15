import FrontendLayout from '@/app/_layouts/FrontendLayout'
import { title } from '@/components/primitives'
import React from 'react'

const NotificationPage = () => {
    return (
		<FrontendLayout>
			<div>
				<h1 className={title()}>Notification Page</h1>
			</div>
		</FrontendLayout>
    )
}

export default NotificationPage