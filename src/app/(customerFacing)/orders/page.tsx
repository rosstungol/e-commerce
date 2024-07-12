'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { emailOrderHistory } from '@/actions/orders'

export default function MyOrdersPage() {
	const [data, action] = useFormState(emailOrderHistory, {})

	return (
		<form action={action} className="max-2-xl mx-auto">
			<Card>
				<CardHeader>
					<CardTitle>My Orders</CardTitle>
					<CardDescription>
						Enter your email and we will email you your order history and
						download links
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input type="email" name="email" id="email" required />
						{data.error && <div className="text-destructive">{data.error}</div>}
					</div>
				</CardContent>
				<CardFooter>
					{data.message ? <p>{data.message}</p> : <SubmitButton />}
				</CardFooter>
			</Card>
		</form>
	)
}

function SubmitButton() {
	const { pending } = useFormStatus()

	return (
		<Button type="submit" className="w-full" size="lg" disabled={pending}>
			{pending ? 'Sending' : 'Send'}
		</Button>
	)
}
