import { useQuery } from '@apollo/client/react'
import { cn } from 'cn'
import { ChevronRight, CircleArrowDown, CircleArrowUp, icons, Tag, Wallet } from 'lucide-react'
import { Link } from 'react-router'
import { CategoryIcon } from '@/components/category-icon'
import { DashboardSummaryCard } from '@/components/dashboard-summary-card'
import { SectionTitle } from '@/components/section-title'
import { TransactionDialog } from '@/components/transaction-dialog'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { formatCurrency, formatDate } from '@/lib/format'
import { LIST_CATEGORIES } from '@/lib/graphql/queries/category'
import { LIST_TRANSACTIONS } from '@/lib/graphql/queries/transaction'
import { transactionTypes } from '@/lib/transaction-types'
import type { Category } from '@/types/category'
import type { Transaction } from '@/types/transaction'

type ListTransactionsQueryData = {
	listTransactions: Transaction[]
}

type ListCategoriesQueryData = {
	listCategories: Category[]
}

function getCurrentMonth() {
	const now = new Date()
	const month = String(now.getMonth() + 1).padStart(2, '0')
	const year = String(now.getFullYear())

	return `${year}-${month}`
}

export function Dashboard() {
	const { data: transactionsData } = useQuery<ListTransactionsQueryData>(LIST_TRANSACTIONS)
	const { data: categoriesData } = useQuery<ListCategoriesQueryData>(LIST_CATEGORIES)

	const transactions = transactionsData?.listTransactions ?? []
	const categories = categoriesData?.listCategories ?? []

	const currentMonth = getCurrentMonth()

	let monthIncome = 0
	let monthExpense = 0
	let balance = 0
	const categoryTotals: Record<string, number> = {}

	for (const transaction of transactions) {
		const isCurrentMonth = transaction.transactionDate.startsWith(currentMonth)

		switch (transaction.type) {
			case 'income':
				balance += transaction.value
				if (isCurrentMonth) monthIncome += transaction.value
				break
			case 'expense':
				balance -= transaction.value
				if (isCurrentMonth) monthExpense += transaction.value
				break
		}

		categoryTotals[transaction.categoryId] =
			(categoryTotals[transaction.categoryId] ?? 0) + transaction.value
	}

	const recentTransactions = transactions.slice(0, 5)

	const topCategories = categories
		.toSorted((a, b) => (categoryTotals[b.id] ?? 0) - (categoryTotals[a.id] ?? 0))
		.slice(0, 5)

	return (
		<>
			<h1 className="sr-only">Dashboard</h1>

			<div className="grid gap-6 grid-cols-3 auto-rows-min">
				<DashboardSummaryCard
					icon={Wallet}
					iconClassName="text-purple-base"
					title="Saldo total"
					value={formatCurrency(balance)}
				/>

				<DashboardSummaryCard
					icon={CircleArrowUp}
					iconClassName="text-brand-base"
					title="Receitas do mês"
					value={formatCurrency(monthIncome)}
				/>

				<DashboardSummaryCard
					icon={CircleArrowDown}
					iconClassName="text-red-base"
					title="Despesas do mês"
					value={formatCurrency(monthExpense)}
				/>

				<Card size="flush" render={<section />} className="col-span-2 self-start">
					<CardHeader className="flex flex-row flex-wrap gap-4 items-center justify-between pl-6 pr-3 py-5 border-gray-200 border-b">
						<SectionTitle>Transações recentes</SectionTitle>
						<Link to="/transacoes" className="text-link">
							Ver todas
							<ChevronRight size={20} />
						</Link>
					</CardHeader>
					<CardContent className="gap-0">
						<ul>
							{recentTransactions?.map((item) => {
								const Icon = icons[item.category?.icon as keyof typeof icons] ?? Tag
								const TypeIcon = transactionTypes[item.type].icon
								const transactionDate = formatDate(item.transactionDate)

								return (
									<li
										key={item.id}
										className="grid grid-cols-[1fr_10rem_10rem] gap-2 border-gray-200 border-b"
									>
										<div className="flex items-center gap-4 px-6 py-4">
											<CategoryIcon icon={Icon} color={item.category?.color ?? 'gray'} />

											<div className="flex flex-col gap-0.5">
												<p className="font-medium text-gray-800 line-clamp-1">{item.description}</p>

												<time
													dateTime={item.transactionDate}
													className="text-sm text-gray-600 leading-5"
												>
													{transactionDate}
												</time>
											</div>
										</div>

										<Badge
											variant={item.category?.color}
											className="self-center justify-self-center"
										>
											{item.category?.title}
										</Badge>

										{item.value > 0 && (
											<div className="flex gap-2 items-center justify-end pr-6">
												<p className="text-gray-800 text-sm font-semibold text-right text-nowrap">
													{item.type === 'income' ? '+' : '-'} {formatCurrency(item.value)}
												</p>
												<TypeIcon
													className={cn('shrink-0 size-4', transactionTypes[item.type].iconColor)}
												/>
											</div>
										)}
									</li>
								)
							})}
						</ul>
						<TransactionDialog
							categories={categories}
							variant="link"
							className="justify-center px-6 py-5"
						/>
					</CardContent>
				</Card>

				<Card render={<section />} size="flush" className="self-start">
					<CardHeader className="flex flex-row flex-wrap gap-4 items-center justify-between px-6 py-5 border-gray-200 border-b">
						<SectionTitle>Categorias</SectionTitle>
						<Link to="/categorias" className="text-link">
							Gerenciar
							<ChevronRight size={20} />
						</Link>
					</CardHeader>
					<CardContent className="gap-0">
						<ul className="flex flex-col gap-5 p-6">
							{topCategories?.map((category) => {
								return (
									<li
										key={category.id}
										className="grid grid-cols-[auto_1fr_auto] gap-1 items-center"
									>
										<Badge variant={category.color}>{category.title}</Badge>

										<span className="text-sm text-gray-600 text-right">
											{category.countTransactions}{' '}
											{category.countTransactions === 1 ? 'item' : 'itens'}
										</span>

										<p className="w-22 text-sm font-semibold text-gray-800 text-right">
											{formatCurrency(categoryTotals[category.id] ?? 0)}
										</p>
									</li>
								)
							})}
						</ul>
					</CardContent>
				</Card>
			</div>
		</>
	)
}
