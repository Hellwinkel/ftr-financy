import { cn } from 'cn'
import type * as React from 'react'

function Table({ className, ...props }: React.ComponentProps<'table'>) {
	return (
		<div data-slot="table-container" className="relative w-full overflow-x-auto">
			<table data-slot="table" className={cn('w-full text-sm', className)} {...props} />
		</div>
	)
}

function TableHeader({ ...props }: React.ComponentProps<'thead'>) {
	return <thead data-slot="table-header" {...props} />
}

function TableBody({ ...props }: React.ComponentProps<'tbody'>) {
	return <tbody data-slot="table-body" {...props} />
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
	return (
		<tr data-slot="table-row" className={cn('border-b border-gray-200', className)} {...props} />
	)
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
	return (
		<th
			data-slot="table-head"
			className={cn(
				'px-6 py-5 align-middle text-xs font-medium uppercase tracking-wider text-gray-500 whitespace-nowrap',
				className
			)}
			{...props}
		/>
	)
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
	return (
		<td
			data-slot="table-cell"
			className={cn('h-18 px-6 align-middle whitespace-nowrap', className)}
			{...props}
		/>
	)
}

export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow }
