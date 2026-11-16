import { icons, Tag, Trash } from 'lucide-react'
import type { Category } from '@/types/category'
import { CategoryDialog } from './category-dialog'
import { CategoryIcon } from './category-icon'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card } from './ui/card'

export function CategoryCard(category: Category) {
	const { title, description, icon, color, countTransactions } = category
	const Icon = icons[icon as keyof typeof icons] ?? Tag

	return (
		<Card size="sm" render={<section />} className="grid grid-rows-[auto_1fr_auto] gap-5">
			<div className="flex gap-4 items-start justify-between">
				<CategoryIcon color={color} icon={Icon} />

				<div className="flex gap-2">
					<Button
						type="button"
						variant="destructive"
						size="icon"
						title="Remover categoria"
						aria-label="Remover categoria"
					>
						<Trash />
					</Button>
					<CategoryDialog category={category} />
				</div>
			</div>

			<div className="flex flex-col gap-1">
				<h2 className="font-semibold text-gray-800">{title}</h2>
				{description && (
					<p className="text-sm leading-5 text-gray-600 line-clamp-2">{description}</p>
				)}
			</div>

			<div className="flex items-center justify-between gap-4">
				<Badge variant={color}>{title}</Badge>

				<span className="text-sm text-gray-600 text-right">
					{countTransactions ?? 0} {countTransactions === 1 ? 'item' : 'itens'}
				</span>
			</div>
		</Card>
	)
}
