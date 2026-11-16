import {
	CircleCheckIcon,
	InfoIcon,
	Loader2Icon,
	OctagonXIcon,
	TriangleAlertIcon,
} from 'lucide-react'
import type { CSSProperties } from 'react'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

function Toaster(props: ToasterProps) {
	return (
		<Sonner
			theme="light"
			icons={{
				success: <CircleCheckIcon className="size-4 text-green-base" />,
				info: <InfoIcon className="size-4 text-blue-base" />,
				warning: <TriangleAlertIcon className="size-4 text-yellow-base" />,
				error: <OctagonXIcon className="size-4 text-red-base" />,
				loading: <Loader2Icon className="size-4 animate-spin" />,
			}}
			style={
				{
					'--normal-bg': 'var(--color-white)',
					'--normal-text': 'var(--color-gray-800)',
					'--normal-border': 'var(--color-gray-200)',
					'--border-radius': 'var(--radius-lg)',
				} as CSSProperties
			}
			{...props}
		/>
	)
}

export { Toaster }
