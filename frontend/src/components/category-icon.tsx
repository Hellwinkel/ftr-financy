import { cn } from 'cn'
import type { LucideIcon } from 'lucide-react'
import { type CategoryColor, categoryColors } from '@/lib/category-colors'

type CategoryIconProps = {
	icon: LucideIcon
	color: CategoryColor
}

export function CategoryIcon({ icon: Icon, color }: CategoryIconProps) {
	return (
		<div
			className={cn(
				'grid size-10 place-items-center rounded-lg shrink-0',
				categoryColors[color]?.icon
			)}
		>
			{Icon && <Icon className="size-4" />}
		</div>
	)
}
