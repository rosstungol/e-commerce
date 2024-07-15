import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function NotFoundPage() {
	return (
		<div className="h-screen p-32">
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<h1 className="text-center text-xl font-bold">
						404 - Page Not Found
					</h1>
				</CardHeader>
				<CardContent>
					<Button asChild className="w-full">
						<Link href="/">Go back home</Link>
					</Button>
				</CardContent>
			</Card>
		</div>
	)
}
