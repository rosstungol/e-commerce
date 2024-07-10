'use client'

import Image from 'next/image'
import { FormEvent, useState } from 'react'
import {
	Elements,
	LinkAuthenticationElement,
	PaymentElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/formatters'
import { userOrderExists } from '@/app/actions/orders'

type CheckoutFormProps = {
	product: {
		id: string
		imagePath: string
		name: string
		priceInCents: number
		description: string
	}
	clientSecret: string
}

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
)

export function CheckoutForm({ product, clientSecret }: CheckoutFormProps) {
	return (
		<div className="mx-auto w-full max-w-5xl space-y-9">
			<div className="flex items-center gap-4">
				<div className="relative aspect-video w-1/3 flex-shrink-0">
					<Image
						src={product.imagePath}
						fill
						alt={product.name}
						className="object-cover"
					/>
				</div>
				<div>
					<div className="text-lg">
						{formatCurrency(product.priceInCents / 100)}
					</div>
					<h1 className="text-2xl font-bold">{product.name}</h1>
					<div className="line-clamp-3 text-muted-foreground">
						{product.description}
					</div>
				</div>
			</div>
			<Elements options={{ clientSecret }} stripe={stripePromise}>
				<Form priceInCents={product.priceInCents} productId={product.id} />
			</Elements>
		</div>
	)
}

function Form({
	priceInCents,
	productId,
}: {
	priceInCents: number
	productId: string
}) {
	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string>()
	const [email, setEmail] = useState<string>()

	const stripe = useStripe()
	const elements = useElements()

	async function handleSubmit(e: FormEvent) {
		e.preventDefault()

		if (stripe == null || elements == null || email == null) return

		setIsLoading(true)

		const orderExists = await userOrderExists(email, productId)

		if (orderExists) {
			setErrorMessage(
				'You have already purchased this product. Try downloading it from the My Orders page.'
			)
			setIsLoading(false)
			return
		}

		stripe
			.confirmPayment({
				elements,
				confirmParams: {
					return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`,
				},
			})
			.then(({ error }) => {
				if (error.type === 'card_error' || error.type === 'validation_error') {
					setErrorMessage(error.message)
				} else {
					setErrorMessage('An unknown error occured')
				}
			})
			.finally(() => setIsLoading(false))
	}

	return (
		<form onSubmit={handleSubmit}>
			<Card>
				<CardHeader>
					<CardTitle>Checkout</CardTitle>
					{errorMessage && (
						<CardDescription className="text-destructive">
							{errorMessage}
						</CardDescription>
					)}
				</CardHeader>
				<CardContent>
					<PaymentElement />
					<div className="mt-4">
						<LinkAuthenticationElement
							onChange={(e) => setEmail(e.value.email)}
						/>
					</div>
				</CardContent>
				<CardFooter>
					<Button
						className="w-full"
						size="lg"
						disabled={stripe == null || elements == null || isLoading}
					>
						{isLoading
							? 'Purchasing...'
							: `Purchase - ${formatCurrency(priceInCents / 100)}`}
					</Button>
				</CardFooter>
			</Card>
		</form>
	)
}
