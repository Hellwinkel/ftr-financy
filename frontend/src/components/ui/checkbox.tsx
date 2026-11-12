import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox'
import { cn } from 'cn'
import { CheckIcon } from 'lucide-react'

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
	return (
		<CheckboxPrimitive.Root
			data-slot="checkbox"
			className={cn(
				'flex size-4 shrink-0 items-center justify-center cursor-pointer rounded-sm border border-gray-300 bg-white outline-none transition-colors focus-visible:ring-3 focus-visible:ring-brand-base/25 data-checked:border-brand-base data-checked:bg-brand-base data-checked:text-white data-disabled:cursor-auto data-disabled:opacity-50',
				className
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				data-slot="checkbox-indicator"
				className="flex items-center justify-center [&>svg]:size-3"
			>
				<CheckIcon />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	)
}

export { Checkbox }
