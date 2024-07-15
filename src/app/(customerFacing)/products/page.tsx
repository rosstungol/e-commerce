import { Suspense } from 'react'
import { ProductCard, ProductCardSkeleton } from '@/components/ProductCard'
import { cache } from '@/lib/cache'
import db from '@/db/db'

const getProducts = cache(() => {
	return db.product.findMany({
		where: {
			isAvailableForPurchase: true,
		},
		orderBy: { name: 'asc' },
	})
}, ['/products', 'getProducts'])

export default function ProductsPage() {
	return (
		<div className="space-y-4">
			<h2 className="text-3xl font-bold">All Products</h2>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				<Suspense
					fallback={
						<>
							<ProductCardSkeleton />
							<ProductCardSkeleton />
							<ProductCardSkeleton />
							<ProductCardSkeleton />
							<ProductCardSkeleton />
							<ProductCardSkeleton />
						</>
					}
				>
					<ProductsSuspense />
				</Suspense>
			</div>
		</div>
	)
}

async function ProductsSuspense() {
	const products = await getProducts()
	return products.map((product) => (
		<ProductCard key={product.id} {...product} />
	))
}
