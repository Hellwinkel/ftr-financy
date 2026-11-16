import { cn } from 'cn'
import { transactionTypes } from '@/lib/transaction-types'
import type { Transaction } from '@/types/transaction'

const labels = {
	expense: 'Saída',
	income: 'Entrada',
}

function TransactionType({ type, className }: { type: Transaction['type']; className?: string }) {
	const { icon: Icon, iconColor, textColor } = transactionTypes[type]

	return (
		<span
			className={cn('inline-flex items-center gap-2 text-sm font-medium', textColor, className)}
		>
			<Icon className={cn('size-4 shrink-0', iconColor)} />
			{labels[type]}
		</span>
	)
}

export { TransactionType }
