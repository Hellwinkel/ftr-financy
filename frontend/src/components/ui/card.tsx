import { mergeProps, useRender } from '@base-ui/react'
import { cn } from 'cn'
import type * as React from 'react'

type CardProps = useRender.ComponentProps<'div'> & {
	size?: 'default' | 'sm' | 'flush'
}

function Card({ className, size = 'default', render, ...props }: CardProps) {
	return useRender({
		defaultTagName: 'div',
		render,
		props: mergeProps<'div'>(
			{
				className: cn(
					'group/card flex flex-col gap-(--card-spacing) rounded-xl border border-gray-200 bg-white p-(--card-spacing) [--card-spacing:--spacing(8)] data-[size=sm]:[--card-spacing:--spacing(6)] data-[size=flush]:[--card-spacing:--spacing(0)]',
					className
				),
			},
			props
		),
		state: {
			slot: 'card',
			size,
		},
	})
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-header"
			className={cn('group/card-header flex flex-col gap-1', className)}
			{...props}
		/>
	)
}

function CardTitle({ className, render, ...props }: useRender.ComponentProps<'div'>) {
	return useRender({
		defaultTagName: 'div',
		render,
		props: mergeProps<'div'>(
			{
				className: cn('text-xl/7 font-bold text-gray-800', className),
			},
			props
		),
		state: {
			slot: 'card-title',
		},
	})
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-description"
			className={cn('text-base text-gray-600', className)}
			{...props}
		/>
	)
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div data-slot="card-content" className={cn('flex flex-col gap-6', className)} {...props} />
	)
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return <div data-slot="card-footer" className={cn('flex flex-col gap-4', className)} {...props} />
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
