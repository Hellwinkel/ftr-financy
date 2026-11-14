import { cn } from 'cn'
import type { LucideIcon } from 'lucide-react'
import { SectionTitle } from './section-title'
import { Card, CardContent, CardHeader } from './ui/card'

type DashboardSummaryCardProps = {
	icon: LucideIcon
	iconClassName?: string
	title: string
	value: string
}

export function DashboardSummaryCard({
	icon: Icon,
	iconClassName,
	title,
	value,
}: DashboardSummaryCardProps) {
	return (
		<Card render={<section />} className="gap-4 p-6">
			<CardHeader className="flex-row items-center gap-3">
				<Icon className={cn('size-5 shrink-0', iconClassName)} />
				<SectionTitle>{title}</SectionTitle>
			</CardHeader>

			<CardContent>
				<p className="text-gray-800 font-bold text-[1.75rem] leading-8">{value}</p>
			</CardContent>
		</Card>
	)
}
