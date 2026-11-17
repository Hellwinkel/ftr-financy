import { useMutation, useQuery } from '@apollo/client/react'
import { icons, Search, Tag, Trash } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { CategoryIcon } from '@/components/category-icon'
import { TransactionDialog } from '@/components/transaction-dialog'
import { TransactionType } from '@/components/transaction-type'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { formatCurrency, formatDate } from '@/lib/format'
import { DELETE_TRANSACTION } from '@/lib/graphql/mutations/transaction'
import { LIST_CATEGORIES } from '@/lib/graphql/queries/category'
import { LIST_TRANSACTIONS } from '@/lib/graphql/queries/transaction'
import type { Category } from '@/types/category'
import type { Transaction } from '@/types/transaction'

type ListTransactionsQueryData = {
	listTransactions: Transaction[]
}

type ListCategoriesQueryData = {
	listCategories: Category[]
}

type DeleteTransactionMutationData = {
	deleteTransaction: boolean
}

const typeOptions = [
	{ label: 'Todos', value: 'all' },
	{ label: 'Entrada', value: 'income' },
	{ label: 'Saída', value: 'expense' },
]

const periodOptions = [
	{ label: 'Todos', value: 'all' },
	{ label: 'Novembro / 2025', value: '2025-11' },
	{ label: 'Outubro / 2025', value: '2025-10' },
	{ label: 'Setembro / 2025', value: '2025-09' },
]

const monthNames = [
	'Janeiro',
	'Fevereiro',
	'Março',
	'Abril',
	'Maio',
	'Junho',
	'Julho',
	'Agosto',
	'Setembro',
	'Outubro',
	'Novembro',
	'Dezembro',
]

function formatPeriod(period: string) {
	const [year, month] = period.split('-')

	return `${monthNames[Number(month) - 1]} / ${year}`
}

export function Transactions() {
	const { data: transactionsData } = useQuery<ListTransactionsQueryData>(LIST_TRANSACTIONS)
	const { data: categoriesData } = useQuery<ListCategoriesQueryData>(LIST_CATEGORIES)

	const transactions = transactionsData?.listTransactions ?? []
	const categories = categoriesData?.listCategories ?? []

	const [search, setSearch] = useState('')
	const [typeFilter, setTypeFilter] = useState('all')
	const [categoryFilter, setCategoryFilter] = useState('all')
	const [periodFilter, setPeriodFilter] = useState('all')

	const categoryOptions = [
		{ label: 'Todas', value: 'all' },
		...categories.map((category) => ({ label: category.title, value: category.id })),
	]

	const months = transactions.map((transaction) => transaction.transactionDate.slice(0, 7))
	const periods = months.filter((month, index) => months.indexOf(month) === index)

	const periodOptions = [
		{ label: 'Todos', value: 'all' },
		...periods.map((period) => ({ label: formatPeriod(period), value: period })),
	]

	const filteredTransactions = transactions.filter((transaction) => {
		const resultsFromSearch = transaction.description
			.toLowerCase()
			.includes(search.trim().toLocaleLowerCase())
		const resultsFromType = typeFilter === 'all' || transaction.type === typeFilter
		const resultsFromCategories =
			categoryFilter === 'all' || transaction.categoryId === categoryFilter
		const resultsFromPeriod =
			periodFilter === 'all' || transaction.transactionDate.startsWith(periodFilter)

		return resultsFromSearch && resultsFromType && resultsFromCategories && resultsFromPeriod
	})

	const [deleteTransaction] = useMutation<DeleteTransactionMutationData, { id: string }>(
		DELETE_TRANSACTION
	)

	async function handleDelete(id: string) {
		const toastId = toast.loading('Removendo transação...')

		try {
			await deleteTransaction({
				variables: {
					id,
				},
				refetchQueries: [LIST_TRANSACTIONS, LIST_CATEGORIES],
			})

			toast.success('Transação removida com sucesso', { id: toastId })
		} catch (error) {
			toast.error(error instanceof Error ? error.message : 'Erro ao remover transação', {
				id: toastId,
			})
		}
	}

	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-row items-center justify-between gap-4">
				<div className="flex flex-col gap-0.5">
					<h1 className="text-2xl font-bold text-gray-800 leading-8">Transações</h1>
					<p className="text-gray-600">Gerencie todas as suas transações financeiras</p>
				</div>

				<TransactionDialog categories={categories} />
			</div>

			<Card size="sm" className="flex-row gap-4 items-start pt-5">
				<Field>
					<FieldLabel htmlFor="search">Buscar</FieldLabel>
					<Input
						type="search"
						name="search"
						id="search"
						icon={Search}
						placeholder="Buscar por descrição"
						value={search}
						onChange={(event) => setSearch(event.target.value)}
					/>
				</Field>

				<Field>
					<FieldLabel htmlFor="type">Tipo</FieldLabel>
					<Select
						items={typeOptions}
						defaultValue="all"
						name="type"
						value={typeFilter}
						onValueChange={(value) => setTypeFilter(value ?? 'all')}
					>
						<SelectTrigger id="type">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{typeOptions.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</Field>

				<Field>
					<FieldLabel htmlFor="category">Categoria</FieldLabel>
					<Select
						items={categoryOptions}
						defaultValue="all"
						name="category"
						value={categoryFilter}
						onValueChange={(value) => setCategoryFilter(value ?? 'all')}
					>
						<SelectTrigger id="category">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{categoryOptions.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</Field>

				<Field>
					<FieldLabel htmlFor="period">Período</FieldLabel>
					<Select
						items={periodOptions}
						defaultValue="all"
						name="period"
						value={periodFilter}
						onValueChange={(value) => setPeriodFilter(value ?? 'all')}
					>
						<SelectTrigger id="period">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{periodOptions.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</Field>
			</Card>

			<Card size="flush">
				<Table className="table-fixed min-w-240">
					<TableHeader>
						<TableRow>
							<TableHead className="text-left">Descrição</TableHead>
							<TableHead className="w-28">Data</TableHead>
							<TableHead className="w-50">Categoria</TableHead>
							<TableHead className="w-34">Tipo</TableHead>
							<TableHead className="w-50 text-right">Valor</TableHead>
							<TableHead className="w-30 text-right">Ações</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{filteredTransactions.map((transaction) => {
							const Icon = icons[transaction.category?.icon as keyof typeof icons] ?? Tag

							return (
								<TableRow key={transaction.id}>
									<TableCell>
										<div className="flex items-center gap-4">
											<CategoryIcon icon={Icon} color={transaction.category?.color ?? 'gray'} />
											<span className="min-w-0 truncate text-base text-gray-800 font-medium">
												{transaction.description}
											</span>
										</div>
									</TableCell>

									<TableCell className="text-center text-gray-600">
										{formatDate(transaction.transactionDate)}
									</TableCell>

									<TableCell className="text-center">
										{transaction.category && (
											<Badge variant={transaction.category?.color}>
												{transaction.category.title}
											</Badge>
										)}
									</TableCell>

									<TableCell className="text-center">
										<TransactionType type={transaction.type} />
									</TableCell>

									<TableCell className="text-right font-semibold text-gray-800">
										{transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.value)}
									</TableCell>

									<TableCell className="flex justify-end items-center gap-2">
										<Button
											type="button"
											variant="destructive"
											size="icon"
											title="Remover transação"
											aria-label="Remover transação"
											onClick={() => handleDelete(transaction.id)}
										>
											<Trash />
										</Button>

										<TransactionDialog categories={categories} transaction={transaction} />
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>

				<div className="flex items-center justify-between px-6 py-5 text-sm text-gray-700">
					<p>
						<strong className="font-medium">1</strong> a <strong className="font-medium">8</strong>{' '}
						| <strong className="font-medium">8</strong> resultados
					</p>

					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious disabled />
							</PaginationItem>
							<PaginationItem>
								<PaginationLink isActive>1</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationNext disabled />
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</Card>
		</div>
	)
}
