import { cn } from 'cn'
import type { LucideIcon } from 'lucide-react'
import { type CategoryColor, categoryColors } from '@/lib/category-colors'
import { SectionTitle } from './section-title'
import { Card } from './ui/card'

type CategorySummaryCardProps = {
	icon: LucideIcon
	color: CategoryColor
	metric: string
	value: string | number
}

export function CategorySummaryCard({
	icon: Icon,
	color,
	metric,
	value,
}: CategorySummaryCardProps) {
	return (
		<Card
			render={<section />}
			size="sm"
			className="flex-1 min-w-[min(15rem,100%)] grid grid-cols-[auto_minmax(0,1fr)] gap-4"
		>
			<Icon className={cn('size-8 p-1 shrink-0', categoryColors[color].text)} />
			<div className="flex flex-col gap-2">
				<p className="font-bold text-[1.75rem] text-gray-800 leading-8 truncate">{value}</p>
				<SectionTitle>{metric}</SectionTitle>
			</div>
		</Card>
	)
}
