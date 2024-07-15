import { ReactNode } from 'react'

export function PageHeader({ children }: { children: ReactNode }) {
	return <h1 className="mb-4 text-3xl font-bold">{children}</h1>
}
