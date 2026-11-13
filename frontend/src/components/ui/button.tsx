import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'

const buttonVariants = cva(
	'group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-[8px] font-medium leading-normal whitespace-nowrap transition-all outline-none select-none cursor-pointer focus-visible:border-ring focus-visible:ring-3 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
	{
		variants: {
			variant: {
				default:
					'bg-brand-base text-white hover:bg-brand-dark disabled:opacity-50 [&_svg]:text-gray-100 focus-visible:ring-brand-base/25',
				outline:
					'inset-shadow-[0_0_0_1px] inset-shadow-gray-300 bg-white text-gray-700 hover:bg-gray-200 hover:inset-shadow-gray-200 focus-visible:ring-gray-300/50',
				destructive:
					'inset-shadow-[0_0_0_1px] inset-shadow-gray-300 bg-white text-gray-700 hover:bg-gray-200 hover:inset-shadow-gray-200 [&_svg]:text-danger focus-visible:ring-gray-300/50',
			},
			size: {
				default: "px-4 py-3 text-base [&_svg:not([class*='size-'])]:size-[18px]",
				sm: "text-sm px-3 py-2 [&_svg:not([class*='size-'])]:size-[16px]",
				icon: "p-[8px] [&_svg:not([class*='size-'])]:size-[16px]",
				pagination: "h-8 min-w-8 px-2 text-sm [&_svg:not([class*='size-'])]:size-4",
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
)

function Button({
	className,
	variant = 'default',
	size = 'default',
	...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
	return (
		<ButtonPrimitive
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	)
}

export { Button, buttonVariants }
