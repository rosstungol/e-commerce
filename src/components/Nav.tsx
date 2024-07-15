'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Nav({ children }: { children: ReactNode }) {
	return (
		<nav className="fixed z-10 flex h-14 w-full items-center justify-center border-b bg-white px-4 shadow-sm">
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
				'h-full p-4 transition hover:bg-slate-50 hover:text-primary focus-visible:bg-slate-50 focus-visible:text-primary',
				pathname === props.href && 'border-b-2 border-primary text-primary'
			)}
		/>
	)
}
