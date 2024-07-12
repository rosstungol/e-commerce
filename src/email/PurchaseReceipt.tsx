import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Preview,
	Tailwind,
} from '@react-email/components'
import { OrderInformation } from './components/OrderInformation'

type PurchaseReceiptEmailProps = {
	product: {
		name: string
		imagePath: string
		description: string
	}
	order: {
		id: string
		createdAt: Date
		pricePaidInCents: number
	}
	downloadVerificationId: string
}

PurchaseReceiptEmail.PreviewProps = {
	product: {
		name: 'Product name',
		description: 'Some description',
		imagePath:
			'/products/0f5a4884-fd0e-4972-8dda-5ed529b9ae33-Screenshot 2024-06-12 192155.png',
	},
	order: {
		id: crypto.randomUUID(),
		createdAt: new Date(),
		pricePaidInCents: 10000,
	},
	downloadVerificationId: crypto.randomUUID(),
} satisfies PurchaseReceiptEmailProps

export default function PurchaseReceiptEmail({
	product,
	order,
	downloadVerificationId,
}: PurchaseReceiptEmailProps) {
	return (
		<Html>
			<Preview>Download {product.name} and view receipt</Preview>
			<Tailwind>
				<Head />
				<Body className="bg-white font-sans">
					<Container>
						<Heading>Purchase Receipt</Heading>
						<OrderInformation
							order={order}
							product={product}
							downloadVerificationId={downloadVerificationId}
						/>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	)
}
