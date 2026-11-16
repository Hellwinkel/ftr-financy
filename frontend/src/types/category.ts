import type { CategoryColor } from '@/lib/category-colors'

export type Category = {
	id: string
	title: string
	description: string | null
	icon: string
	color: CategoryColor
	countTransactions: number | null
}

export type CreateCategoryInput = {
	title: string
	description?: string | null
	icon: string
	color: CategoryColor
}

export type UpdateCategoryInput = Partial<CreateCategoryInput>
