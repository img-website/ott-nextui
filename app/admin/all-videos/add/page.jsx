import AdminLayout from '@/app/_layouts/AdminLayout'
import { title } from '@/components/primitives'
import React from 'react'

const AddPage = () => {
    return (
		<AdminLayout>
			<div>
				<h1 className={title()}>Add Video Page</h1>
			</div>
		</AdminLayout>
    )
}

export default AddPage