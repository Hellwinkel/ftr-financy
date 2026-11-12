import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'
import { type CategoryColor, categoryColors } from '@/lib/category-colors'

export type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>

const colorVariants = Object.fromEntries(
	Object.entries(categoryColors).map(([name, classes]) => [name, classes.badge])
) as Record<CategoryColor, string>

const badgeVariants = cva(
	'group/badge inline-block w-fit overflow-hidden rounded-full px-3 py-1 text-sm font-medium whitespace-nowrap',
	{
		variants: {
			variant: colorVariants,
		},
		defaultVariants: {
			variant: 'gray',
		},
	}
)

function Badge({
	className,
	variant = 'gray',
	render,
	...props
}: useRender.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
	return useRender({
		defaultTagName: 'span',
		props: mergeProps<'span'>(
			{
				className: cn(badgeVariants({ variant }), className),
			},
			props
		),
		render,
		state: {
			slot: 'badge',
			variant,
		},
	})
}

export { Badge, badgeVariants }
