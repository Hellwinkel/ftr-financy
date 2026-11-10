import { cn } from 'cn'
import type * as React from 'react'

function Label({ className, ...props }: React.ComponentProps<'label'>) {
	return (
		// biome-ignore lint/a11y/noLabelWithoutControl: htmlFor chega pelo props
		<label
			data-slot="label"
			className={cn(
				'flex items-center gap-2 text-sm/5 text-gray-700 font-medium select-none',
				className
			)}
			{...props}
		/>
	)
}

export { Label }
