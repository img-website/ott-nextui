import FrontendLayout from '@/app/_layouts/FrontendLayout'
import { title } from '@/components/primitives'
import React from 'react'

const InstaViralPage = () => {
    return (
		<FrontendLayout>
			<div>
				<h1 className={title()}>Insta Viral Page</h1>
			</div>
		</FrontendLayout>
    )
}

export default InstaViralPage