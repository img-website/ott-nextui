import FrontendLayout from '@/app/_layouts/FrontendLayout'
import { title } from '@/components/primitives'
import React from 'react'

const TrendingPage = () => {
    return (
		<FrontendLayout>
			<div>
				<h1 className={title()}>Trending Page</h1>
			</div>
		</FrontendLayout>
    )
}

export default TrendingPage