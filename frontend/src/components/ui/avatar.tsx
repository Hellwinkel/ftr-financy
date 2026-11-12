import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar'
import { cn } from 'cn'

function Avatar({
	className,
	size = 'default',
	...props
}: AvatarPrimitive.Root.Props & {
	size?: 'default' | 'sm' | 'lg'
}) {
	return (
		<AvatarPrimitive.Root
			data-slot="avatar"
			data-size={size}
			className={cn(
				'group/avatar relative flex size-9 shrink-0 rounded-full select-none data-[size=sm]:size-6 data-[size=lg]:size-16',
				className
			)}
			{...props}
		/>
	)
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
	return (
		<AvatarPrimitive.Image
			data-slot="avatar-image"
			className={cn('aspect-square size-full rounded-full object-cover', className)}
			{...props}
		/>
	)
}

function AvatarFallback({ className, ...props }: AvatarPrimitive.Fallback.Props) {
	return (
		<AvatarPrimitive.Fallback
			data-slot="avatar-fallback"
			className={cn(
				'flex size-full items-center justify-center rounded-full bg-gray-300 text-sm font-medium text-gray-800 group-data-[size=sm]/avatar:text-xs group-data-[size=lg]/avatar:text-2xl',
				className
			)}
			{...props}
		/>
	)
}

export { Avatar, AvatarFallback, AvatarImage }
