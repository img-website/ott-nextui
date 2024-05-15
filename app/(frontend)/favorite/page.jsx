import FrontendLayout from '@/app/_layouts/FrontendLayout'
import { title } from '@/components/primitives'
import React from 'react'

const FavoritePage = () => {
    return (
		<FrontendLayout>
			<div>
				<h1 className={title()}>Favorite Page</h1>
			</div>
		</FrontendLayout>
    )
}

export default FavoritePage