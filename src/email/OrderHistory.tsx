import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Preview,
	Tailwind,
} from '@react-email/components'
import { OrderInformation } from './components/OrderInformation'
import React from 'react'

type OrderHistoryEmailProps = {
	orders: {
		id: string
		pricePaidInCents: number
		createdAt: Date
		downloadVerificationId: string
		product: {
			name: string
			imagePath: string
			description: string
		}
	}[]
}

OrderHistoryEmail.PreviewProps = {
	orders: [
		{
			id: crypto.randomUUID(),
			createdAt: new Date(),
			pricePaidInCents: 10000,
			downloadVerificationId: crypto.randomUUID(),
			product: {
				name: 'Product name',
				description: 'Some description',
				imagePath:
					'/products/c184d8b7-efb2-467f-b83b-d2980a331b19-Screenshot 2021-08-10 122705.png',
			},
		},
		{
			id: crypto.randomUUID(),
			createdAt: new Date(),
			pricePaidInCents: 10000,
			downloadVerificationId: crypto.randomUUID(),
			product: {
				name: 'Product name 2',
				description: 'Some other description',
				imagePath:
					'/products/0f5a4884-fd0e-4972-8dda-5ed529b9ae33-Screenshot 2024-06-12 192155.png',
			},
		},
	],
} satisfies OrderHistoryEmailProps

export default function OrderHistoryEmail({ orders }: OrderHistoryEmailProps) {
	return (
		<Html>
			<Preview>Order History and Downloads</Preview>
			<Tailwind>
				<Head />
				<Body className="bg-white font-sans">
					<Container>
						<Heading>Order History</Heading>
						{orders.map((order, index) => (
							<React.Fragment key={order.id}>
								<OrderInformation
									order={order}
									product={order.product}
									downloadVerificationId={order.downloadVerificationId}
								/>
								{index < orders.length - 1 && <Hr />}
							</React.Fragment>
						))}
					</Container>
				</Body>
			</Tailwind>
		</Html>
	)
}
