import { Nav, NavLink } from '@/components/Nav'

export const dynamic = 'force-dynamic'

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<Nav>
				<NavLink href="/">Home</NavLink>
				<NavLink href="/products">Products</NavLink>
				<NavLink href="/orders">My Orders</NavLink>
			</Nav>
			<main className="container pb-20 pt-28">{children}</main>
		</>
	)
}
