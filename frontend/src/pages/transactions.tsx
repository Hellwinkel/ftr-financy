import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Transactions() {
	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-row items-center justify-between gap-4">
				<div className="flex flex-col gap-0.5">
					<h1 className="text-2xl font-bold text-gray-800 leading-8">Transações</h1>
					<p className="text-gray-600">Gerencie todas as suas transações financeiras</p>
				</div>

				<Button size="sm">
					<Plus />
					Nova transação
				</Button>
			</div>
		</div>
	)
}
