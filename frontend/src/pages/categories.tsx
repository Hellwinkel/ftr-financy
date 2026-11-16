import { useQuery } from '@apollo/client/react'
import { ArrowUpDown, icons, SquareStar, Tag } from 'lucide-react'
import { CategoryCard } from '@/components/category-card'
import { CategoryDialog } from '@/components/category-dialog'
import { CategorySummaryCard } from '@/components/category-summary-card'
import { LIST_CATEGORIES } from '@/lib/graphql/queries/category'
import type { Category } from '@/types/category'

type ListCategoriesQueryData = {
	listCategories: Category[]
}

export function Categories() {
	const { data } = useQuery<ListCategoriesQueryData>(LIST_CATEGORIES)
	const categories = data?.listCategories ?? []

	const totalCategories = categories.length
	const totalTransactions = categories.reduce(
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

				<CategoryDialog />
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
