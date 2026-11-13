import { cn } from 'cn'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import type * as React from 'react'
import { Button } from '@/components/ui/button'

function Pagination({ ...props }: React.ComponentProps<'nav'>) {
	return <nav aria-label="Paginação" data-slot="pagination" {...props} />
}

function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>) {
	return (
		<ul
			data-slot="pagination-content"
			className={cn('flex items-center gap-2', className)}
			{...props}
		/>
	)
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
	return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
	isActive?: boolean
} & React.ComponentProps<typeof Button>

function PaginationLink({ isActive, ...props }: PaginationLinkProps) {
	return (
		<Button
			type="button"
			variant={isActive ? 'default' : 'outline'}
			size="pagination"
			aria-current={isActive ? 'page' : undefined}
			data-slot="pagination-link"
			{...props}
		/>
	)
}

function PaginationPrevious(props: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink aria-label="Página anterior" {...props}>
			<ChevronLeftIcon />
		</PaginationLink>
	)
}

function PaginationNext(props: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink aria-label="Próxima página" {...props}>
			<ChevronRightIcon />
		</PaginationLink>
	)
}

export {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
}
