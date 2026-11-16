import type { transactionTypes } from '@/lib/transaction-types'
import type { Category } from './category'

export type Transaction = {
	id: string
	description: string
	transactionDate: string
	type: keyof typeof transactionTypes
	value: number
	categoryId: string
	category: Pick<Category, 'id' | 'title' | 'icon' | 'color'> | null
}

export type CreateTransactionInput = {
	type: Transaction['type']
	description: string
	transactionDate: string
	value: number
	categoryId: string
}

export type UpdateTransactionInput = Partial<CreateTransactionInput>
