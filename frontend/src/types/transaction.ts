import type { Category } from './category'

export type Transaction = {
	id: string
	description: string
	transactionDate: string
	type: 'income' | 'expense'
	value: number
	categoryId: string
	category: Pick<Category, 'id' | 'title' | 'icon' | 'color'> | null
}
