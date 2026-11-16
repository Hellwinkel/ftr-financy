import { CircleArrowDown, CircleArrowUp } from 'lucide-react'

export const transactionTypes = {
	expense: {
		icon: CircleArrowDown,
		iconColor: 'text-red-base',
		textColor: 'text-red-dark',
		checked: 'has-checked:inset-shadow-red-base has-checked:[&_svg]:text-red-base',
	},
	income: {
		icon: CircleArrowUp,
		iconColor: 'text-green-base',
		textColor: 'text-green-dark',
		checked: 'has-checked:inset-shadow-green-base has-checked:[&_svg]:text-green-base',
	},
} as const
