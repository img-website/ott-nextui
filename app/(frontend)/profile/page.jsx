import FrontendLayout from '@/app/_layouts/FrontendLayout'
import { title } from '@/components/primitives'
import React from 'react'

const ProfilePage = () => {
    return (
		<FrontendLayout>
			<div>
				<h1 className={title()}>Profile Page</h1>
			</div>
		</FrontendLayout>
    )
}

export default ProfilePage