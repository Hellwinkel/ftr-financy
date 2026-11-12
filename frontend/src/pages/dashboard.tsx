import { ChevronRight, CircleArrowDown, CircleArrowUp, icons, Plus, Wallet } from 'lucide-react'
import type { LucideIcon } from 'lucide-react/types'
import { CategoryIcon } from '@/components/category-icon'
import { SectionTitle } from '@/components/section-title'
import { SummaryCard } from '@/components/summary-card'
import { Badge, type BadgeVariant } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import type { CategoryColor } from '@/lib/category-colors'
import { formatCurrency, formatDate } from '@/lib/format'

const recentTransactions = [
	{
		id: '00916606-38ee-40d7-b7b8-a25011b92933',
		description: 'Pagamento de salário',
		transactionDate: '2025-12-01',
		type: 'income',
		value: 425000,
		category: {
			icon: 'BriefcaseBusiness',
			color: 'green',
			title: 'Receita',
		},
	},
	{
		id: '198d5dbc-91e3-4b75-bdc5-1c6f5e9f90a3',
		description: 'Jantar no restaurante',
		transactionDate: '2025-11-30',
		type: 'expense',
		value: 8950,
		category: {
			icon: 'Utensils',
			color: 'blue',
			title: 'Alimentação',
		},
	},
	{
		id: '38a23199-70bc-4e77-a58c-25ad744edecf',
		description: 'Posto de gasolina',
		transactionDate: '2025-11-29',
		type: 'expense',
		value: 10000,
		category: {
			icon: 'CarFront',
			color: 'purple',
			title: 'Transporte',
		},
	},
	{
		id: 'cd3a212d-6711-4b07-b6d7-d13cdb52a2b5',
		description: 'Compras no mercado',
		transactionDate: '2025-11-28',
		type: 'expense',
		value: 15680,
		category: {
			icon: 'ShoppingCart',
			color: 'orange',
			title: 'Mercado',
		},
	},
	{
		id: '926988ef-638e-4b71-a982-5f5272f45fac',
		description: 'Retorno de investimento',
		transactionDate: '2025-11-25',
		type: 'income',
		value: 34025,
		category: {
			icon: 'PiggyBank',
			color: 'green',
			title: 'Investimento',
		},
	},
]

const userCategories = [
	{
		id: 'b25f4864-c5c3-485e-8ba5-38f3b804c00f',
		title: 'Alimentação',
		color: 'blue',
		countTransactions: 12,
		total: 54230,
	},
	{
		id: 'b3e4c0ac-7017-44a9-8c69-84e103359450',
		title: 'Transporte',
		color: 'purple',
		countTransactions: 8,
		total: 38550,
	},
	{
		id: 'bc81f2be-b661-4cd2-aa13-3abf73558e35',
		title: 'Mercado',
		color: 'orange',
		countTransactions: 3,
		total: 29875,
	},
	{
		id: '0f0ae266-8fd6-46fc-93bd-e11a59bbbbea',
		title: 'Entretenimento',
		color: 'pink',
		countTransactions: 2,
		total: 18620,
	},
	{
		id: '8efede76-8dbb-4c3b-a08c-c4b33dc7a71a',
		title: 'Utilidades',
		color: 'yellow',
		countTransactions: 7,
		total: 24580,
	},
]

export function Dashboard() {
	return (
		<>
			<h1 className="sr-only">Dashboard</h1>

			<div className="grid gap-6 grid-cols-3 auto-rows-min">
				<SummaryCard
					icon={Wallet}
					iconClassName="text-purple-base"
					title="Saldo total"
					value={formatCurrency(1284732)}
				/>

				<SummaryCard
					icon={CircleArrowUp}
					iconClassName="text-brand-base"
					title="Receitas do mês"
					value={formatCurrency(425000)}
				/>

				<SummaryCard
					icon={CircleArrowDown}
					iconClassName="text-red-base"
					title="Despesas do mês"
					value={formatCurrency(218045)}
				/>

				<Card size="flush" render={<section />} className="col-span-2 self-start">
					<CardHeader className="flex flex-row flex-wrap gap-4 items-center justify-between px-6 py-5 border-gray-200 border-b">
						<SectionTitle>Transações recentes</SectionTitle>
						<a href="transacoes" className="text-link">
							Ver todas
							<ChevronRight size={20} />
						</a>
					</CardHeader>
					<CardContent className="gap-0">
						<ul>
							{recentTransactions?.map((item) => {
								const Icon: LucideIcon | undefined = icons[item.category.icon as keyof typeof icons]
								const transactionDate = formatDate(item.transactionDate)

								return (
									<li
										key={item.id}
										className="grid grid-cols-[1fr_10rem_10rem] gap-4 border-gray-200 border-b"
									>
										<div className="flex items-center gap-4 px-6 py-4">
											{Icon && (
												<CategoryIcon icon={Icon} color={item.category.color as CategoryColor} />
											)}

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
											variant={item.category.color as BadgeVariant}
											className="self-center justify-self-center"
										>
											{item.category.title}
										</Badge>

										{item.value > 0 && (
											<div className="flex gap-2 items-center justify-end pr-6">
												<p className="text-gray-800 text-sm font-semibold text-right text-nowrap">
													{item.type === 'income' ? '+' : '-'} {formatCurrency(item.value)}
												</p>
												{item.type === 'income' ? (
													<CircleArrowUp className="shrink-0 size-4 text-brand-base" />
												) : (
													<CircleArrowDown className="shrink-0 size-4 text-red-base" />
												)}
											</div>
										)}
									</li>
								)
							})}
						</ul>
						<button type="button" className="text-link justify-center px-6 py-5">
							<Plus className="size-5" />
							Nova transação
						</button>
					</CardContent>
				</Card>

				<Card render={<section />} size="flush" className="self-start">
					<CardHeader className="flex flex-row flex-wrap gap-4 items-center justify-between px-6 py-5 border-gray-200 border-b">
						<SectionTitle>Categorias</SectionTitle>
						<a href="categorias" className="text-link">
							Gerenciar
							<ChevronRight size={20} />
						</a>
					</CardHeader>
					<CardContent className="gap-0">
						<ul className="flex flex-col gap-5 p-6">
							{userCategories?.map((category) => {
								return (
									<li
										key={category.id}
										className="grid grid-cols-[auto_1fr_auto] gap-1 items-center"
									>
										<Badge variant={category.color as CategoryColor}>{category.title}</Badge>

										<span className="text-sm text-gray-600 text-right">
											{category.countTransactions}{' '}
											{category.countTransactions === 1 ? 'item' : 'itens'}
										</span>

										<p className="w-22 text-sm font-semibold text-gray-800 text-right">
											{formatCurrency(category.total)}
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
