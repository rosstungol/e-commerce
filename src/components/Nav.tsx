'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Nav({ children }: { children: ReactNode }) {
	return (
		<nav className="fixed z-10 flex h-16 w-full items-center justify-center border-b bg-white px-4 shadow-sm">
			{children}
		</nav>
	)
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, 'className'>) {
	const pathname = usePathname()
	return (
		<Link
			{...props}
			className={cn(
				'p-4 transition hover:text-primary focus-visible:text-primary',
				pathname === props.href && 'text-primary'
			)}
		/>
	)
}
