import { icons, Search, Tag, Trash } from 'lucide-react'
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
import type { Category } from '@/types/category'
import type { Transaction } from '@/types/transaction'

const typeOptions = [
	{ label: 'Todos', value: 'all' },
	{ label: 'Entrada', value: 'income' },
	{ label: 'Saída', value: 'expense' },
]

const categories: Pick<Category, 'id' | 'title'>[] = [
	{ id: '6a9dd5f3-923c-45bc-b37d-0204a55d3c9d', title: 'Alimentação' },
	{ id: '8f268b52-8f54-48fc-95fc-c1ac3ee54d11', title: 'Entretenimento' },
	{ id: 'd0935278-1e84-4d8a-bfa2-27857d81ecee', title: 'Investimento' },
	{ id: '3d2097ba-76a4-4f2f-acf2-cccf6c75e2f6', title: 'Mercado' },
	{ id: '7d2b1080-6a17-446d-a68a-684e196013d8', title: 'Salário' },
	{ id: 'bf09de26-834a-4c21-94b9-2e9c11034542', title: 'Saúde' },
	{ id: 'e02554e2-48ef-4507-bcc7-d2a878badabe', title: 'Transporte' },
	{ id: '18e657b4-4393-4216-82c9-821d3613659d', title: 'Utilidades' },
]

const categoryOptions = [
	{ label: 'Todas', value: 'all' },
	...categories.map((category) => ({ label: category.title, value: category.id })),
]

const periodOptions = [
	{ label: 'Todos', value: 'all' },
	{ label: 'Novembro / 2025', value: '2025-11' },
	{ label: 'Outubro / 2025', value: '2025-10' },
	{ label: 'Setembro / 2025', value: '2025-09' },
]

const transactions: Transaction[] = [
	{
		id: 'a1e771f0-f315-452e-9d36-99f3587d7823',
		description: 'Jantar no Restaurante',
		transactionDate: '2025-11-30',
		type: 'expense',
		value: 8950,
		categoryId: '6a9dd5f3-923c-45bc-b37d-0204a55d3c9d',
		category: {
			id: '6a9dd5f3-923c-45bc-b37d-0204a55d3c9d',
			title: 'Alimentação',
			icon: 'Utensils',
			color: 'blue',
		},
	},
	{
		id: 'ba96660b-62b6-4e14-95dc-77b5846cfb10',
		description: 'Posto de Gasolina',
		transactionDate: '2025-11-29',
		type: 'expense',
		value: 10000,
		categoryId: 'e02554e2-48ef-4507-bcc7-d2a878badabe',
		category: {
			id: 'e02554e2-48ef-4507-bcc7-d2a878badabe',
			title: 'Transporte',
			icon: 'CarFront',
			color: 'purple',
		},
	},
	{
		id: 'b1006409-30e5-42fd-a5da-d0b0c49173ca',
		description: 'Compras no Mercado',
		transactionDate: '2025-11-28',
		type: 'expense',
		value: 15680,
		categoryId: '3d2097ba-76a4-4f2f-acf2-cccf6c75e2f6',
		category: {
			id: '3d2097ba-76a4-4f2f-acf2-cccf6c75e2f6',
			title: 'Mercado',
			icon: 'ShoppingCart',
			color: 'orange',
		},
	},
	{
		id: 'c3d436b5-c0dc-4ea4-983d-e84171254aab',
		description: 'Retorno de Investimento',
		transactionDate: '2025-11-26',
		type: 'income',
		value: 34025,
		categoryId: 'd0935278-1e84-4d8a-bfa2-27857d81ecee',
		category: {
			id: 'd0935278-1e84-4d8a-bfa2-27857d81ecee',
			title: 'Investimento',
			icon: 'PiggyBank',
			color: 'green',
		},
	},
	{
		id: 'a8c13d3e-de83-4d58-82b5-ddc19120d53f',
		description: 'Aluguel',
		transactionDate: '2025-11-26',
		type: 'expense',
		value: 170000,
		categoryId: '18e657b4-4393-4216-82c9-821d3613659d',
		category: {
			id: '18e657b4-4393-4216-82c9-821d3613659d',
			title: 'Utilidades',
			icon: 'ToolCase',
			color: 'yellow',
		},
	},
	{
		id: 'de508721-52e1-4dfe-9a37-7fc27acb6a84',
		description: 'Freelance',
		transactionDate: '2025-11-24',
		type: 'income',
		value: 250000,
		categoryId: '7d2b1080-6a17-446d-a68a-684e196013d8',
		category: {
			id: '7d2b1080-6a17-446d-a68a-684e196013d8',
			title: 'Salário',
			icon: 'BriefcaseBusiness',
			color: 'green',
		},
	},
	{
		id: 'a232e7cd-613c-412a-8e25-25fbf83574df',
		description: 'Compras Jantar',
		transactionDate: '2025-11-22',
		type: 'expense',
		value: 15000,
		categoryId: '3d2097ba-76a4-4f2f-acf2-cccf6c75e2f6',
		category: {
			id: '3d2097ba-76a4-4f2f-acf2-cccf6c75e2f6',
			title: 'Mercado',
			icon: 'ShoppingCart',
			color: 'orange',
		},
	},
	{
		id: '14fb44ef-4d0b-4b3f-9779-43e84db12438',
		description: 'Cinema',
		transactionDate: '2025-11-18',
		type: 'expense',
		value: 8800,
		categoryId: '8f268b52-8f54-48fc-95fc-c1ac3ee54d11',
		category: {
			id: '8f268b52-8f54-48fc-95fc-c1ac3ee54d11',
			title: 'Entretenimento',
			icon: 'Ticket',
			color: 'pink',
		},
	},
]

export function Transactions() {
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
					/>
				</Field>

				<Field>
					<FieldLabel htmlFor="type">Tipo</FieldLabel>
					<Select items={typeOptions} defaultValue="all" name="type">
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
					<Select items={categoryOptions} defaultValue="all" name="category">
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
					<Select items={periodOptions} defaultValue="all" name="period">
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
						{transactions.map((transaction) => {
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
