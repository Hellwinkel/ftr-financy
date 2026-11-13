import { ArrowUpDown, icons, Plus, SquareStar, Tag } from 'lucide-react'
import { CategoryCard } from '@/components/category-card'
import { CategorySummaryCard } from '@/components/category-summary-card'
import { Button } from '@/components/ui/button'
import type { Category } from '@/types/category'

const categories: Category[] = [
	{
		id: '6a9dd5f3-923c-45bc-b37d-0204a55d3c9d',
		title: 'Alimentação',
		description: 'Restaurantes, delivery e refeições',
		icon: 'Utensils',
		color: 'blue',
		countTransactions: 12,
	},
	{
		id: '8f268b52-8f54-48fc-95fc-c1ac3ee54d11',
		title: 'Entretenimento',
		description: 'Cinema, jogos e lazer',
		icon: 'Ticket',
		color: 'pink',
		countTransactions: 2,
	},
	{
		id: 'd0935278-1e84-4d8a-bfa2-27857d81ecee',
		title: 'Investimento',
		description: 'Aplicações e retornos financeiros',
		icon: 'PiggyBank',
		color: 'green',
		countTransactions: 1,
	},
	{
		id: '3d2097ba-76a4-4f2f-acf2-cccf6c75e2f6',
		title: 'Mercado',
		description: 'Compras de supermercado e mantimentos',
		icon: 'ShoppingCart',
		color: 'orange',
		countTransactions: 3,
	},
	{
		id: '7d2b1080-6a17-446d-a68a-684e196013d8',
		title: 'Salário',
		description: 'Renda mensal e bonificações',
		icon: 'BriefcaseBusiness',
		color: 'green',
		countTransactions: 3,
	},
	{
		id: 'bf09de26-834a-4c21-94b9-2e9c11034542',
		title: 'Saúde',
		description: 'Medicamentos, consulta e exames',
		icon: 'HeartPulse',
		color: 'red',
		countTransactions: 0,
	},
	{
		id: 'e02554e2-48ef-4507-bcc7-d2a878badabe',
		title: 'Transporte',
		description: 'Gasolina, transporte público e viagens',
		icon: 'CarFront',
		color: 'purple',
		countTransactions: 8,
	},
	{
		id: '18e657b4-4393-4216-82c9-821d3613659d',
		title: 'Utilidades',
		description: 'Energia, água, internet e telefone',
		icon: 'ToolCase',
		color: 'yellow',
		countTransactions: 7,
	},
]

export function Categories() {
	const totalCategories = categories.length
	const totalTransactions = categories?.reduce(
		(sum, category) => sum + (category.countTransactions ?? 0),
		0
	)
	const mostUsedCategories = categories.toSorted(
		(a, b) => (b.countTransactions ?? 0) - (a.countTransactions ?? 0)
	)

	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-row items-center justify-between gap-4">
				<div className="flex flex-col gap-0.5">
					<h1 className="text-2xl font-bold text-gray-800 leading-8">Categorias</h1>
					<p className="text-gray-600">Organize suas transações por categorias</p>
				</div>

				<Button size="sm">
					<Plus />
					Nova categoria
				</Button>
			</div>

			<div className="flex flex-row flex-wrap gap-6">
				<CategorySummaryCard
					icon={Tag}
					color="gray"
					metric="Total de categorias"
					value={totalCategories}
				/>
				<CategorySummaryCard
					icon={ArrowUpDown}
					color="purple"
					metric="Total de transações"
					value={totalTransactions}
				/>
				{mostUsedCategories.length > 0 && (
					<CategorySummaryCard
						icon={icons[mostUsedCategories[0].icon as keyof typeof icons] ?? SquareStar}
						color={mostUsedCategories[0].color}
						metric="Categoria mais utilizada"
						value={mostUsedCategories[0].title}
					/>
				)}
			</div>

			{categories.length > 0 && (
				<div className="grid grid-cols-4 gap-4">
					{categories.map((category) => {
						return (
							<CategoryCard
								key={category.id}
								id={category.id}
								title={category.title}
								description={category.description}
								icon={category.icon}
								color={category.color}
								countTransactions={category.countTransactions}
							/>
						)
					})}
				</div>
			)}
		</div>
	)
}
